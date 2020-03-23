function validarFormaAnfitrion() {
	if (!document.miForma.field10.checked) {
		alert("Debe aceptar los términos y condiciones");
		return false;
	}
	else if (document.miForma.field1.value.trim() == "" || document.miForma.field2.value.trim() == "" || document.miForma.field4.value.trim() == "") {
		alert("Debe rellenar todos sus datos personales");
		return false;
	}
	else if (document.miForma.field5.value.trim() == "" || document.miForma.field6.value.trim() == "") {
		alert("Debe rellenar todos sus datos de contacto");
		return false;
  }
  else if( $('#capture')[0].getAttribute("captured") == "false" ){
    alert("Use el boton verde para fotografiarse. Se debe tomar una foto que coincida con el de su pasaporte.");
    return false;
  } 
  return true;
}

function validarFormaHuesped() {
	if (!document.miForma.field10.checked) {
		alert("Debe aceptar los términos y condiciones");
		return false;
	}
	else if (document.miForma.field1.value.trim() == "" || document.miForma.field2.value.trim() == "" || document.miForma.field4.value.trim() == "") {
		alert("Debe rellenar todos sus datos personales");
		return false;
	}
	else if (document.miForma.field5.value.trim() == "" || document.miForma.field6.value.trim() == "") {
		alert("Debe rellenar todos sus datos de contacto");
		return false;
  }
  return true;
}

$('#btnSubmitAnfitrion').on('click', function () { 
    if(validarFormaAnfitrion()){
      /* 
      dataToSend = {
        nombres: $('#txtNombres')[0].value,
        paterno: $('#txtPaterno')[0].value,
        materno: $('#txtMaterno')[0].value,
        idPasaporte: $('#txtIdPasaporte')[0].value,
        direccion: $('#txtDireccion')[0].value,
        pais: $('#selPais').val(),
        cantidad: $('#selCantidadPersonas').val()
      }*/
      dataToSend = {
        "datosDeContacto": {
          "correoElectronico": "yo@aqui.com",
          "telefono": "+34 55 55 55"
        },
        "datosDelHogarDeAcogida": {
          "geometry": {
            "coordinates": [
              -3.700660,
              40.417720
            ],
            "type": "Point"
          },
          "properties": {
            "direccion": $('#txtDireccion')[0].value,
            "pais": $('#selPais').val(),
            "regionOEstado": "Madrid",
            "capacidad":$('#selCantidadPersonas').val()
          },
          "type": "Feature"
        },
        "datosPersonales": {
          "apellidoMaterno": $('#txtMaterno')[0].value,
          "apellidoPaterno": $('#txtPaterno')[0].value,
          "nombres": $('#txtNombres')[0].value,
          "numeroDePasaporte":$('#txtIdPasaporte')[0].value
        },
        "disponible": true,
        "verificado": false/*,
        "imagen": $('#capture')[0].toDataURL()*/
      }
      alert( "Enviando json: " + JSON.stringify(dataToSend))
      //llamada asíncrona a servidor
     $.ajax({
      url: '/saveAnfitrion',
      type: 'POST',
      // Form data
      data: dataToSend,
      dataType: 'json',
      success: function (data) {
       alert("Muchas gracias por su ayuda para aliviar la situación emergente. Si hay candidatos para aprovechar su ayuda un representante de la SRE se pondrá en contacto con usted.")
      },
      error: function (error) {
        alert("Por el momento el registro está fuera de servicio, intente más tarde.")
        console.log(error)
      }
    }); 
    } else {
      //form was not ok.
    }

    //$('#sectionResultado')[0].style.visibility = "visible"
    

  });

  $('#btnSubmitHuesped').on('click', function () { 
    if(validarFormaHuesped()){
      dataToSend = {
        nombres: $('#txtNombres')[0].value,
        paterno: $('#txtPaterno')[0].value,
        materno: $('#txtMaterno')[0].value,
        idPasaporte: $('#txtIdPasaporte')[0].value,
        direccion: $('#txtDireccion')[0].value,
        pais: $('#selPais').val(),
        cantidad: $('#selCantidadPersonas').val()
      }
      alert( "Enviando json: " + JSON.stringify(dataToSend))
      //llamada asíncrona a servidor
     $.ajax({
      url: '/saveHuesped',
      type: 'POST',
      // Form data
      data: dataToSend,
      dataType: 'json',
      success: function (data) {
       alert("Su información ha sido enviada a la SRE. Recibirá una comunicación una vez que se confirme que hay disponibilidad de hospedaje para usted.")
      },
      error: function (error) {
        alert("Error. Ver consola backend y UI")
        console.log(error)
      }
    }); 
    } else {

    }

    //$('#sectionResultado')[0].style.visibility = "visible"
    

  });



