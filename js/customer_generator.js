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
		this.LeftBoundary  = cfg.LeftBoundary  || 0
		this.RightBoundary = cfg.RightBoundary || 10
		if (this.ProbabilityDistribution === 'even') {
			this.ProbabilityEngine = new _evenProbability(cfg.LeftBoundary || 0, cfg.RightBoundary || 10)
		} else {
			this.ProbabilityEngine = new _normalProbability(
				this.LeftBoundary ,
				this.RightBoundary,
				cfg.NormalCount || 10
			)
		}
		this.BoundaryTweakValue = cfg.BoundaryTweakValue || 0.1
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

	probabilityUp() {
		this.ProbabilityEngine.b -= this.BoundaryTweakValue
		if (this.ProbabilityEngine.b - this.ProbabilityEngine.a < 1) {
			this.ProbabilityEngine.a++
		}
	}

	probabilityDown() {
		this.ProbabilityEngine.b += this.BoundaryTweakValue
	}

	generateCustomer() {
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
}
