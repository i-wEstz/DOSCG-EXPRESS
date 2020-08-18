var DOSCG = require('../src/controller/DOSCG.controller')
var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route('/polynomial')
    .post(DOSCG.calculateCompletePolynomial)

router.route('/google-map')
    .get(DOSCG.getGoogleApiData)

router.route('/line/:id')
    .post(DOSCG.receivedLineMessage)

router.route('/algebra/:a')
    .get(DOSCG.calculateAlgebra)

module.exports = router;
