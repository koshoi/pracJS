var Model = {}
document.getElementById('start-button').onclick = function () {
	Model = new SMModel ()
	Model.startModel()
	Model.redraw()
}

document.getElementById('iterate-button').onclick = function () {
	Model.iterateModel()
}
