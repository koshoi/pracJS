class _evenProbability {
	constructor(a, b) {
		this.a = a
		this.b = b
	}

	getValue() {
		return Math.round(this.a + Math.random() * (this.b - this.a))
	}
}

class _normalProbability {
	constructor(a, b, norm_count) {
		this.a = a
		this.b = b
		// amount of even random values we take to form normal ditribution
		this.NormalCount = norm_count
	}

	getValue() {
		var val = 0
		for (var i = 0; i < this.NormalCount; i++) {
			val += this.a + Math.random() * (this.b - this.a)
		}
		return Math.round(val / this.NormalCount)
	}
}

class CustomerGenerator {
	constructor(cfg) {
		this.ProbabilityDistribution = cfg.ProbabilityDistribution || 'even'
		this.LeftBoundary            = cfg.LeftBoundary            || 0
		this.RightBoundary           = cfg.RightBoundary           || 10
		this.CommercialExpensesBoost = cfg.CommercialExpensesBoost || 10
		this.CustomerLeavingPenalty  = cfg.CustomerLeavingPenalty  || 0.5
		this.DiscountBoost           = cfg.DiscountBoost           || 0.5
		if (this.ProbabilityDistribution === 'even') {
			this.ProbabilityEngine = new _evenProbability(cfg.LeftBoundary || 0, cfg.RightBoundary || 10)
		} else {
			this.ProbabilityEngine = new _normalProbability(
				this.LeftBoundary ,
				this.RightBoundary,
				cfg.NormalCount || 10
			)
		}
		this.NextCustomerTimeLeft = this.ProbabilityEngine.getValue()

		this.CustomerEngine = {}
		this.CustomerEngine.PriceEngine = new _evenProbability(
			cfg.CustomerConfig.MinPrice,
			cfg.CustomerConfig.MaxPrice
		)
		this.CustomerEngine.TimeEngine = new _evenProbability(
			cfg.CustomerConfig.MinServiceTime,
			cfg.CustomerConfig.MaxServiceTime
		)
	}

	restoreProbabilities() {
		this.ProbabilityEngine.a = this.LeftBoundary
		this.ProbabilityEngine.b = this.RightBoundary
	}

	probabilityUp(percentage) {
		var d = this.ProbabilityEngine.b - this.ProbabilityEngine.a
		this.ProbabilityEngine.b -= d * percentage / 100
		if (this.ProbabilityEngine.b - this.ProbabilityEngine.a < 1) {
			this.ProbabilityEngine.a++
		}
	}

	probabilityDown(percentage) {
		var d = this.ProbabilityEngine.b - this.ProbabilityEngine.a
		this.ProbabilityEngine.b += d * percentage / 100
	}

	generateCustomer() {
		this.NextCustomerTimeLeft = this.ProbabilityEngine.getValue()
		return new Customer (
			this.CustomerEngine.TimeEngine.getValue(),
			this.CustomerEngine.PriceEngine.getValue()
		)
	}

	tick() {
		if (this.NextCustomerTimeLeft === 1) {
			return this.generateCustomer()
		}

		this.NextCustomerTimeLeft--
		return null
	}

	toString() {
		return '<b>LeftBoundary</b>: ' + this.ProbabilityEngine.a + '<br>' +
			'<b>RightBoundary</b>: ' + this.ProbabilityEngine.b + '<br>' +
			'<b>NextCustomerTimeLeft</b>: ' + this.NextCustomerTimeLeft + '<br>'
	}
}
