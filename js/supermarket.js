class SuperMarket {
	constructor(cfg) {
		this.MaxQueueLength     = cfg.MaxQueueLength     || 7
		this.MaxCashBoxes       = cfg.MaxCashBoxes       || 5
		this.CommercialExpenses = cfg.CommercialExpenses || 0
		this.Discount           = cfg.Discount           || 0
		this.Balance            = cfg.Balance            || 0
		this.CashierSalary      = cfg.CashierSalary      || 2000
		this.CustomerProfit     = cfg.CustomerProfit     || 0.09
		this.CashBoxes          = new Array()
		for (var i = 0; i < this.MaxCashBoxes; i++) {
			this.CashBoxes.push(new CashBox (i))
		}
	}

	tick() {
		for (var i = 0; i < this.CashBoxes.length; i++) {
			this.Balance += this.CashBoxes[i].tick() * (1 - this.Discount / 100) * this.CustomerProfit
		}
	}

	takeCustomer(customer) {
		var working = this.CashBoxes.filter(function (a) {
			return a.Working
		})

		working.sort(function(a, b) {
			if (a.Queue.length > b.Queue.length) {
				return 1
			} else if (a.Queue.length === b.Queue.length) {
				return 0
			} else {
				return -1
			}
		})

		var cbox = working[0]
		if (!cbox) {
			return false
		}
		if (cbox.Queue.length === this.MaxQueueLength) {
			return false
		}

		cbox.takeCustomer(customer)
		return true
	}

	countExpenses() {
		var working = this.CashBoxes.filter(function (a) {
			return a.Working
		})
		var delta = this.CommercialExpenses + this.CashierSalary * working.length
		this.Balance -= this.CommercialExpenses + this.CashierSalary * working.length
	}

	toString() {
		return '<b>Balance</b>: ' + Math.round(this.Balance) + '<br>'
	}
}
