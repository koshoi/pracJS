class Render {
	constructor (rows, columns) {
		var main_el = document.getElementById('Grid')
		for (var r = 0; r < rows; r++) {
			var new_r = document.createElement("tr")
			for (var c = 0; c < columns; c++) {
				var new_c = document.createElement("td")
			}
		}
	}

	newRow (arr) {
		var row = document.createElement("tr")
		for (var i=0; i<arr.length; i++) {
			row.appendChild(arr[i])
		}
		return row
	}

	newElement (id, data) {
		var row = document.createElement("td")
		row.id = id
		row.appendChild(document.createTextNode(data))
		return row
	}

	makeGrid(rows, columns, prefix) {
		for (var i=0; i<rows; i++) {
			var row_arr = new Array (columns)
			for (var j=0; j<columns; j++) {
			}
		}
	}
}
