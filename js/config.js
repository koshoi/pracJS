var Config = {
	SuperMarket : {
		MaxQueueLength     : 7,
		MaxCashBoxes       : 5,
		CommercialExpenses : 0,
		Discount           : 0,
		CashierSalary      : 2000,
		CustomerProfit     : 0.09
	},
	CustomerGenerator : {
		ProbabilityDistribution : 'normal',
		LeftBoundary            : 0,
		RightBoundary           : 10,
		CustomerLeavingPenalty  : 0.5,
		CommercialExpensesBoost : 10,
		CustomerConfig          : {
			MinServiceTime : 1,
			MaxServiceTime : 10,
			MinPrice       : 30,
			MaxPrice       : 9000
		}
	}
}

var SMParams = ['MaxQueueLength', 'MaxCashBoxes', 'CommercialExpenses', 'Discount', 'CashierSalary', 'CustomerProfit']
var CGParams = ['ProbabilityDistribution', 'LeftBoundary', 'RightBoundary', 'CustomerLeavingPenalty', 'CommercialExpensesBoost', 'DiscountBoost']
var CCParams = ['MinServiceTime', 'MaxServiceTime', 'MinPrice', 'MaxPrice']

for (var i = 0; i < SMParams.length; i++) {
	var k    = SMParams[i]
	var elem = document.getElementById(k)
	if (elem === null) {
		alert("Element " + k + " not found")
	}
	elem.value = Config.SuperMarket[k]
	elem.onchange = function (event) {
		var v = Number(event.target.value)
		if (isNaN(v)) {
			alert("Not a number!")
			return 0
		}
		Config.SuperMarket[event.target.id] = v
	}
}

for (var i = 0; i < CGParams.length; i++) {
	var k    = CGParams[i]
	var elem = document.getElementById(k)
	if (elem === null) {
		alert("Element " + k + " not found")
	}
	elem.value = Config.CustomerGenerator[k]
	elem.onchange = function (event) {
		if (event.target.id !== 'ProbabilityDistribution') {
			var v = Number(event.target.value)
			if (isNaN(v)) {
				alert("Not a number!")
				return 0
			}
			Config.CustomerGenerator[event.target.id] = v
		} else {
			Config.CustomerGenerator[event.target.id] = event.target.value
		}
	}
}

for (var i = 0; i < CCParams.length; i++) {
	var k    = CCParams[i]
	var elem = document.getElementById(k)
	if (elem === null) {
		alert("Element " + k + " not found")
	}
	elem.value = Config.CustomerGenerator.CustomerConfig[k]
	elem.onchange = function (event) {
		var v = Number(event.target.value)
		if (isNaN(v)) {
			alert("Not a number!")
			return 0
		}
		Config.CustomerGenerator.CustomerConfig[event.target.id] = v
	}
}
