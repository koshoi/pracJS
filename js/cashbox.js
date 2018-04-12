class CashBox {
	constructor() {
		this.Queue           = new Array ()
		this.Working         = true
		this.CurrentCustomer = null
	}

	takeCustomer(customer) {
		if (this.CurrentCustomer === null) {
			this.CurrentCustomer = customer
			return 0
		}

		this.Queue.push(customer)
		return this.Queue.length
	}

	tick() {
		var cash = 0
		if (!this.Working) {
			return cash
		}

		if (this.CurrentCustomer) {
			this.CurrentCustomer.Time--
			if (this.CurrentCustomer.Time === 0) {
				cash = this.CurrentCustomer.Price
				if (this.Queue.length > 0) {
					this.CurrentCustomer = this.Queue.shift()
				} else {
					this.CurrentCustomer = null
				}
			}
		}
		return cash
	}
}
