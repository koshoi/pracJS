var Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

class SMModel {
	constructor() {
		this.Config            = Config,
		this.SuperMarket       = new SuperMarket(Config.SuperMarket),
		this.CustomerGenerator = new CustomerGenerator(Config.CustomerGenerator)
		this.Render            = new Render ()
		this.Working           = true
		var ce = this.SuperMarket.CommercialExpenses
		for (var i=0; i<this.SuperMarket.CommercialExpenses % 10000; i++) {
			this.CustomerGenerator.probabilityUp(this.CustomerGenerator.CommercialExpensesBoost)
			ce -= 10000
		}
		this.CustomerGenerator.probabilityUp(
			ce
			* this.CustomerGenerator.CommercialExpensesBoost
			/ 10000
		)

		this.Time = {}
		this.Time.TicksTaken = 0
		this.Time.Hours      = 0
		this.Time.Days       = 0

		this.Runtime = {}
		this.Runtime.Stat = {}
		this.Runtime.Stat.CustomersLeft = 0
	}

	tick(n_ticks) {
		for (var i=0; i<n_ticks; i++) {
			this.SuperMarket.tick()
			var customer = this.CustomerGenerator.tick()
			if (customer !== null) {
				if (!this.SuperMarket.takeCustomer(customer)) {
					this.CustomerGenerator.probabilityDown(this.CustomerGenerator.CustomerLeavingPenalty)
					this.Runtime.Stat.CustomersLeft++
				}
			}
			this.incTime()
		}
	}

	incTime() {
		this.Time.TicksTaken++
		if (this.Time.TicksTaken % 60 === 0) {
			this.Time.Hours++
		}

		if (this.Time.Hours === 24) {
			this.Time.Days++
			if (this.Time.Days === 7) {
				this.stopModel()
			}
			this.Time.Hours = 0
			this.SuperMarket.countExpenses()
		}
	}

	redraw() {
		for (var cb_id=0; cb_id<this.SuperMarket.CashBoxes.length; cb_id++) {
			var cbox    = this.SuperMarket.CashBoxes[cb_id]
			var cbox_el = document.getElementById('grid:0:' + cb_id)
			if (!cbox.Working) {
				cbox_el.classList.remove('cashbox')
			} else {
				cbox_el.classList.add('cashbox')
				if (cbox.CurrentCustomer) {
					cbox_el.innerHTML = cbox.CurrentCustomer.toString()
				} else {
					cbox_el.innerHTML = '<h2>Empty</h2>'
				}
			}

			for (var cust_id=0; cust_id<this.SuperMarket.MaxQueueLength; cust_id++) {
				var customer = cbox.Queue[cust_id]
				var id = 'grid:' + (cust_id+1) + ':' + cb_id
				var cust_el  = document.getElementById(id)
				if (customer) {
					cust_el.classList.add('customer')
					cust_el.innerHTML = customer.toString()
				} else {
					cust_el.classList.remove('customer')
					cust_el.innerHTML = '<h3>Empty</h3>'
				}
			}
		}

		var stat_el = document.getElementById('stat')
		stat_el.innerHTML = this.SuperMarket.toString() + this.CustomerGenerator.toString() +
			'<b>Customers Left</b>: ' + this.Runtime.Stat.CustomersLeft + '<br>' +
			'<h1>----------------</h1>' +
			'<h1>' + Days[this.Time.Days] + ' ' + this.Time.Hours + ':' + (this.Time.TicksTaken % 60) + '</h1><br>'
		return 1
	}

	startModel() {
		document.getElementById('setup').hidden = true
		var runtime = document.getElementById('runtime')
		runtime.hidden = false

		var grid = this.Render.makeGrid(
			this.Config.SuperMarket.MaxQueueLength + 1, //1 more place for current customer
			this.Config.SuperMarket.MaxCashBoxes
		)

		document.getElementById('queues').appendChild(grid)
		for (var i=0; i<this.Config.SuperMarket.MaxCashBoxes; i++) {
			this.Render.getGridElem(0, i).classList.add('cashbox')
		}

		var tpi = document.getElementById('TicksPerIteration')
		tpi.value = 5

		return 1
	}

	iterateModel() {
		if (this.Working) {
			var tpi = document.getElementById('TicksPerIteration')
			this.tick(tpi.value)
			this.redraw()
		}
	}

	stopModel() {
		this.Working = false
		document.getElementById('queues').hidden = true
		document.getElementById('control').hidden = true
		document.getElementById('stat').hidden = true
		var results = document.getElementById('results')
		results.hidden = false
		results.innerHTML =
			'<b>Balance</b>: '       + this.SuperMarket.Balance        + '<br>' +
			'<b>CustomersLeft</b>: ' + this.Runtime.Stat.CustomersLeft + '<br>'
	}
}

