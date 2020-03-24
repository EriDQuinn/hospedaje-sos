// Manejo de la tabla de acompañantes

function agregarRenglon() {
    table = $("#tblTablaAco")[0]
	if (document.getElementById("tblTablaAco").rows.length <= 0) {
		// Crear tabla
        var row = table.insertRow(-1);
        row.innerHTML = "<th>Nombre(s)</th><th>Apellido(s)</th><th>Edad</th><th>Acción</th>"
        var row2 = table.insertRow(document.getElementById("tblTablaAco").rows.length);
        row2.innerHTML = "<td><input type='text'/></td><td><input type='text'/></td><td><input type='text'/></td><td><input type='button' onclick='borrarRenglon(this)' value='Borrar' rowId=1/></td>"
    } else {
        var row2 = table.insertRow(-1);
        row2.innerHTML = "<td><input type='text'/></td><td><input type='text'/></td><td><input type='text'/></td><td><input type='button' onclick='borrarRenglon(this)' value='Borrar' rowId=N/></td>"
    }
    for (let index = 0; index < document.getElementById("tblTablaAco").rows.length - 1; index++) { //reset labels
        document.getElementById("tblTablaAco").rows[index + 1].children[3].children[0].setAttribute("rowId",index + 1)
    }
    actualizaCuentasRows()
}

function borrarRenglon(rowIdButton){
    $("#tblTablaAco")[0].deleteRow(Number.parseInt(rowIdButton.getAttribute("rowId")))
    actualizaCuentasRows()
}

function actualizaCuentasRows(){
    $("#lblNumAco")[0].innerHTML =  "Número de Acompañantes " + (document.getElementById("tblTablaAco").rows.length-1);
    for (let index = 0; index < document.getElementById("tblTablaAco").rows.length - 1; index++) { //reset labels
        document.getElementById("tblTablaAco").rows[index + 1].children[3].children[0].setAttribute("rowId",index + 1)
    }
}

function getDatosAcompañantes(){
    var datosAcompañantes = []
    for (let index = 0; index < document.getElementById("tblTablaAco").rows.length - 1; index++) { //reset labels
        datosAcompañantes.push(
            {
               "nombres": document.getElementById("tblTablaAco").rows[index + 1].children[0].children[0].value.trim(),
                "apellidoPaterno": document.getElementById("tblTablaAco").rows[index + 1].children[1].children[0].value.trim(),
                "apellidoMaterno": document.getElementById("tblTablaAco").rows[index + 1].children[2].children[0].value.trim(),
                "sexo": "NA",
                "edad":document.getElementById("tblTablaAco").rows[index + 1].children[3].children[0].value.trim(),
                "nacionalidad": "NA"
            }
        )
    }
    return datosAcompañantes;
}