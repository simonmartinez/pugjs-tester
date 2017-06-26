var express = require('express'),
    router  = express.Router(),
    pug     = require('jade');

function getTemplateDirectory () {
    var tmp = __dirname.split("/");
    return tmp.splice(0, tmp.length - 1).join("/") + "/views/";
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var templateDirectory = getTemplateDirectory();


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'PugJS Tester'
    });
});

router.post('/pugjsTest', function (req, res, next) {
    if (!req.body.template) {
        res.status(500).send('Template not found or empty');
    } else if (!IsJsonString(req.body.object)) {
        res.status(500).send('Invalid object');
    } else {
        let template = pug.compile(req.body.template);
        var objTemplate = JSON.parse(req.body.object);
        var htmlResult = template(objTemplate);
        res.send(template(objTemplate));
    }
});
