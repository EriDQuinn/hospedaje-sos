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
  else if( $('#capture')[0].getAttribute("captured") == "false" ){
    alert("Use el boton verde para fotografiarse. Se debe tomar una foto que coincida con el de su pasaporte.");
    return false;
  } 
  return true;
}

$('#btnSubmitAnfitrion').on('click', function () { 
    if(validarFormaAnfitrion()){
      dataToSend = {
        "datosDeContacto": {
          "correoElectronico": $('#txtEmail')[0].value.trim(),
          "telefono": $('#txtTelefono')[0].value.trim()
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
            "direccion": $('#txtDireccion')[0].value.trim(),
            "pais": $('#selPais').val(),
            "regionOEstado": $('#txtDireccion')[0].value.trim(),
            "capacidad":$('#selCantidadPersonas').val()
          },
          "type": "Feature"
        },
        "datosPersonales": {
          "apellidoMaterno": $('#txtMaterno')[0].value.trim(),
          "apellidoPaterno": $('#txtPaterno')[0].value.trim(),
          "nombres": $('#txtNombres')[0].value,
          "numeroDePasaporte":$('#txtIdPasaporte')[0].value.trim()
        },
        "disponible": true,
        "verificado": false,
        "imagen": $('#capture')[0].toDataURL().substr(22)
      }
      //alert( "Enviando json: " + JSON.stringify(dataToSend))
      //llamada asíncrona a servidor
     $.ajax({
      url: '/saveAnfitrion',
      type: 'PUT',
      // Form data
      data: dataToSend,
      dataType: 'json',
      success: function (data) {
        alert("Muchas gracias por su ayuda para aliviar la situación emergente. Si hay candidatos para aprovechar su ayuda un representante de la SRE se pondrá en contacto con usted.")
        $(location).attr('href', '/')
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
    datosAcompañantes = getDatosAcompañantes();
    if(validarFormaAnfitrion()){
      dataToSend = {
        "datosDeContacto": {
          "correoElectronico": $('#txtEmail')[0].value.trim(),
          "telefono": $('#txtTelefono')[0].value.trim()
        },
        "datosAcompanantes":getDatosAcompañantes(),
        "datosDeUbicacion": {
          "geometry": {
            "coordinates": [
              -3.700660,
              40.417720
            ],
            "type": "Point"
          },
          "properties": {
            "direccion": $('#txtDireccion')[0].value.trim(),
            "pais": $('#pais').val(),
            "regionOEstado": $('#txtDireccion')[0].value.trim(),
            "capacidad":$('#selCantidadPersonas').val()
          },
          "type": "Feature"
        },
        "datosPersonales": {
          "apellidoMaterno": $('#txtMaterno')[0].value.trim(),
          "apellidoPaterno": $('#txtPaterno')[0].value.trim(),
          "nombres": $('#txtNombres')[0].value,
          "numeroDePasaporte":$('#txtIdPasaporte')[0].value.trim()
        },
        "disponible": true,
        "verificado": false,
        "imagen": $('#capture')[0].toDataURL().substr(22)
      }
      //alert( "Enviando json: " + JSON.stringify(dataToSend))
      //llamada asíncrona a servidor
     $.ajax({
      url: '/saveHuesped',
      type: 'PUT',
      // Form data
      data: dataToSend,
      dataType: 'json',
      success: function (data) {
       alert("Su información ha sido enviada a la SRE. Recibirá una comunicación una vez que se confirme que hay disponibilidad de hospedaje para usted.")
       $(location).attr('href', '/')
      },
      error: function (error) {
        alert("Por el momento no es posible continuar. Intentar más tarde.")
        console.log(error)
      }
    }); 
    } 
  });

$('#btnSiguienteValidacion').on('click', function () { 
  dataToSend = { "please": "yes"}
  //llamada asíncrona a servidor
 $.ajax({
    url: '/siguienteValidacion',
    type: 'POST',
    // Form data
    data: dataToSend,
    dataType: 'json',
    success: function (requestData) {
      console.log("La data recibida es " + requestData)
      dataRecibida = requestData.data
      $('#txtNombres')[0].value = dataRecibida.datosPersonales.nombres;
      $('#txtPaterno')[0].value = dataRecibida.datosPersonales.apellidoPaterno
      $('#txtMaterno')[0].value = dataRecibida.datosPersonales.apellidoMaterno
      $('#txtIdPasaporte')[0].value = dataRecibida.datosPersonales.numeroDePasaporte
      $('#txtTelefono')[0].value = dataRecibida.datosDeContacto.telefono
      $('#txtEmail')[0].value = dataRecibida.datosDeContacto.correoElectronico
      //$('#divFoto')[0].src = "data:image/png;base64," + dataRecibida.imagen;
      $('#lblTipo')[0].innerText = dataRecibida.tipo != null ?dataRecibida.tipo.toUpperCase() :"Mexicano";
      $('#hdnId')[0].value=dataRecibida._id
      $('#hdnRev')[0].value=dataRecibida._rev
      alert("Verifique con los servicios consulares que la información es correcta. De ser necesario realice contacto con la persona.")   
      $('#btnSiguienteValidacion').hide()
    },
    error: function (error) {
      alert("Por el momento no es posible validar. Inténtelo más tarde.")
      console.log(error)
    }
  }); 
})

$('#btnValidar').on('click', function () { 
  //llamada asíncrona a servidor
  dataToSend = {"_id": $('#hdnId')[0].value,"_rev":$('#hdnRev').value}
 $.ajax({
    url: '/validar',
    type: 'POST',
    // Form data
    data: dataToSend,
    dataType: 'json',
    success: function (requestData) {
      console.log("La data recibida es " + requestData)
      dataRecibida = requestData.data
      alert("El mexicano ha sido validado.")   
      $('#btnSiguienteValidacion').show()
    },
    error: function (error) {
      alert("Por el momento no es posible validar. Inténtelo más tarde.")
      console.log(error)
    }
  });
})
