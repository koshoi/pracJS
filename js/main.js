var Model = {}
document.getElementById('start-button').onclick = function () {
	Model = new SMModel ()
	Model.startModel()
	Model.redraw()
}

document.getElementById('iterate-button').onclick = function () {
	Model.iterateModel()
}

document.getElementById('finish-button').onclick = function () {
	document.getElementById('TicksPerIteration').value = 24*60*7;
	Model.iterateModel()
}
