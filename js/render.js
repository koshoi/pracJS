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
		var elem = document.createElement("td")
		elem.id = id
		elem.appendChild(document.createTextNode(data))
		elem.classList.add('grid-elem')
		return elem
	}

	makeGrid(rows, columns) {
		var grid = document.createElement('table')
		for (var i=rows-1; i>=0; i--) {
			var row_arr = new Array ()
			for (var j=0; j<columns; j++) {
				var id = 'grid:' + i + ':' + j
				row_arr.push(this.newElement(id, '[[data for ' + id + ']]'))
			}
			var row = this.newRow(row_arr)
			grid.appendChild(row)
		}
		grid.classList.add('grid')
		return grid
	}

	getGridElem(row, column) {
		var id = 'grid:' + row + ':' + column
		return document.getElementById(id)
	}
}
