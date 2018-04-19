class Customer {
	constructor(time, price) {
		this.Id    = Math.random().toString(36).substring(7);
		this.Time  = time
		this.Price = price
	}

	toString() {
		return '[' + this.Id + ']' + "<br>" + 'Price: ' + this.Price + "<br>" + 'Ticks: ' + this.Time
	}
}
