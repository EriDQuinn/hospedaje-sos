 /**
  *  Recibe los requests de webservices 
  * 
  */

 const express = require('express');
 router = express.Router();
 const RP = require('request-promise');

 /* Hace el render del home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

 /* Hace el render de situación actual */
 router.get('/', function(req, res, next) {
  res.render('situacionActual');
});

 /* Hace el render de la página de validación */
 router.get('/validacion', function(req, res, next) {
  res.render('validacion');
});

/* Hace el render del view de anfitrión. */
router.get('/registroAnfitrion', function(req, res, next) {
  res.render('registroAnfitrion');
});

/* Hace el render del view de huesped. */
router.get('/registroHuesped', function(req, res, next) {
  res.render('registroHuesped');
});

/* Invocación a backend para almacenar anfitrión. Request se recibe de UI */
router.put('/saveAnfitrion', function(req, res, next) {
  //console.log(req.body)
  if (!req.body || req.body.length === 0) {
    return res.status(400).send('Error recibieron datos incorrectos o nulos');
  } else {
    console.log("Se ha recibido el request para el /saveAnfitrión")
    
    //call a Functions off-server
    console.log("Data repo uri " + process.env.DATA_REPO_BASE_URI + "/anfitrion")

    var options = {
      method: 'PUT',
      uri: process.env.DATA_REPO_BASE_URI + "/anfitrion",
      body: req.body,
      json: true, // Automatically stringifies the body to JSON
      resolveWithFullResponse : true
    };
    

    RP(options)
      .then(function (fullresponse) {
          if(fullresponse.statusCode <= 200){
            console.log("Request exitoso. Respuesta fue %j", fullresponse.body)
            res.json({data:fullresponse.body})
          } else {
            return res.status(500).send('Error parcial al invocar la función remota: ' + fullresponse.statusCode);
          }
      })
      .catch(function (err) {
        console.error("Error", err )
        return res.status(500).send('Error al invocar la función remota' + err);
    });
    
  }
});

/* Invocación a backend para almacenar huesped */
router.put('/saveHuesped', function(req, res, next) {
  console.log(req.body)
  if (!req.body || req.body.length === 0) {
    return res.status(400).send('Error recibieron datos incorrectos o nulos');
  } else {
    console.log("Se ha recibido el request para el /saveHuesped")
    //call a Functions off-server
    console.log("Data repo uri " + process.env.DATA_REPO_BASE_URI + "/huesped")
    var options = {
      method: 'PUT',
      uri: process.env.DATA_REPO_BASE_URI + "/huesped",
      body: req.body,
      json: true, // Automatically stringifies the body to JSON
      resolveWithFullResponse : true
    };

    RP(options)
      .then(function (fullresponse) {
        if(fullresponse.statusCode == 200){
          console.log("Request exitoso. Respuesta fue %j", fullresponse.body)
          res.json({data:fullresponse.body})
        } else {
          console.error(fullresponse.body)
          return res.status(500).send('Error parcial al invocar la función remota: ' + fullresponse.statusCode);
        }
    })
  }
});

/* Invocación a backend para solicitar una nueva validación */
router.post('/siguienteValidacion', function(req, res, next) {
  console.log(req.body)
  if (!req.body || req.body.length === 0) {
    return res.status(400).send('Error recibieron datos incorrectos o nulos');
  } else {
    console.log("Se ha recibido el request para el /siguientevalidacion")
    //call a Functions off-server
    console.log("Data repo uri " + process.env.DATA_REPO_BASE_URI)
    var options = {
      method: 'GET',
      uri: process.env.DATA_REPO_BASE_URI + "/validacion/solicita",
      body: req.body,
      json: true, // Automatically stringifies the body to JSON
      resolveWithFullResponse : true
    };
    

    RP(options)
      .then(function (fullresponse) {
        if(fullresponse.statusCode == 200){
          console.log("Request exitoso. Respuesta fue %j", fullresponse.body)
          res.json({data:fullresponse.body})
        } else {
          console.error(fullresponse.body)
          return res.status(500).send('Error parcial al invocar la función remota: ' + fullresponse.statusCode);
        }
      })
      .catch(function (err) {
        return res.status(400).send('Error al invocar la Function remota: ' + err);
    });
  }
});

/* Invocación a backend para solicitar una nueva validación */
router.post('/validar', function(req, res, next) {
  console.log(req.body)
  if (!req.body || req.body.length === 0) {
    return res.status(400).send('Error recibieron datos incorrectos o nulos');
  } else {
    console.log("Se ha recibido el request para el /siguientevalidacion")
    //call a Functions off-server
    console.log("Data repo uri " + process.env.DATA_REPO_BASE_URI)
    var options = {
      method: 'PUT',
      uri: process.env.DATA_REPO_BASE_URI + "/validacion/valida",
      body: req.body,
      json: true, // Automatically stringifies the body to JSON
      resolveWithFullResponse : true
    };
    

    RP(options)
      .then(function (fullresponse) {
        if(fullresponse.statusCode == 200){
          console.log("Request exitoso. Respuesta fue %j", fullresponse.body)
          res.json({data:fullresponse.body})
        } else {
          console.error(fullresponse.body)
          return res.status(500).send('Error parcial al invocar la función remota: ' + fullresponse.statusCode);
        }
      })
      .catch(function (err) {
        return res.status(400).send('Error al invocar la Function remota: ' + err);
    });
  }
});

 /* Invocación a backend para selfie
router.get('/selfie-src', function(req, res, next) {
  console.log(req.id)
  if (!req.body || req.body.length === 0) {
    return res.status(400).send('Error recibieron datos incorrectos o nulos');
  } else {
    res.json({data:fullresponse.body})
    console.log("Se ha recibido el request para el /selfie")
    //call a Functions off-server
    console.log("Data repo uri " + process.env.DATA_REPO_BASE_URI)
    var options = {
      method: 'GET',
      uri: "https://c05b528f-88c3-498c-98f4-a29d4d2b13da-bluemix.cloudant.com/anfitriones-potenciales/"+req.id+"/selfie",
      body: req.body,
      json: true, // Automatically stringifies the body to JSON
      resolveWithFullResponse : true
    };
  }
}); */

module.exports = router;






