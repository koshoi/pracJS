class SMModel {
	constructor() {
		this.Config            = Config,
		this.SuperMarket       = new SuperMarket(Config.SuperMarket),
		this.CustomerGenerator = new CustomerGenerator(Config.CustomerGenerator)

		this.Time = {}
		this.Time.TicksTaken = 0
		this.Time.Hours      = 0
		this.Time.Days       = 0
	}

	tick(n_ticks) {
		for (var i=0; i<n_ticks; i++) {
			this.SuperMarket.tick()
			var customer = this.CustomerGenerator.tick()
			if (customer !== null) {
				this.SuperMarket.takeCustomer(customer)
			}
			this.incTime()
		}
		this.redraw()
	}

	incTime() {
		this.Time.TicksTaken++
		if (this.Time.TicksTaken % 60 === 0) {
			this.Time.Hours++
		}

		if (this.Time.Hours === 24) {
			this.Time.Days++
			this.Time.Hours = 0
			this.SuperMarket.countExpenses()
		}
	}

	redraw() {
		// add some workflow with HTML
		return 1
	}

	startModel() {
		// TODO: add starting
		return 1
	}
}

