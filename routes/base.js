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

/* Hace el render del view de anfitrión. */
router.get('/registroAnfitrion', function(req, res, next) {
  res.render('registroAnfitrion');
});

/* Hace el render del view de huesped. */
router.get('/registroHuesped', function(req, res, next) {
  res.render('registroHuesped');
});

/* Invocación a backend para almacenar anfitrión */
router.post('/saveAnfitrion', function(req, res, next) {
  //console.log(req.body)
  if (!req.body || req.body.length === 0) {
    return res.status(400).send('Error recibieron datos incorrectos o nulos');
  } else {
    console.log("Se ha recibido el request para el /saveSolicitante")
    
    //call a Functions off-server
    console.log("Data repo uri " + process.env.DATA_REPO_ANFITRION_URI)
    var options = {
      method: 'PUT',
      uri: process.env.DATA_REPO_ANFITRION_URI,
      body: req.body,
      json: true // Automatically stringifies the body to JSON
    };
    

    RP(options)
      .then(function (parsedBody) {
          console.log("Request exitoso. Respuesta fue %j", parsedBody )
          res.json({data:parsedBody})
      })
      .catch(function (err) {
        console.error("Error", err )
        return res.status(500).send('Error al invocar la función remota' + err);
    });
    
  }
});

/* Invocación a backend para almacenar huesped */
router.post('/saveHuesped', function(req, res, next) {
  //console.log(req.body)
  if (!req.body || req.body.length === 0) {
    return res.status(400).send('Error recibieron datos incorrectos o nulos');
  } else {
    console.log("Se ha recibido el request para el /saveHuesped")
    res.json({data:'ok'})
    //call a Functions off-server
    /*console.log("Data repo uri " + process.env.DATA_REPO_URI)
    var options = {
      method: 'POST',
      uri: process.env.DATA_REPO_URI,
      body: req.body,
      json: true // Automatically stringifies the body to JSON
    };
    

    RP(options)
      .then(function (parsedBody) {
          console.log("Request exitoso. Respuesta fue %j", parsedBody )
          res.json({data:parsedBody})
      })
      .catch(function (err) {
        return res.status(400).send('Error al invocar la Function remota: ' + err);
    });
    */
  }
});

module.exports = router;






