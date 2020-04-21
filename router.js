
var express = require('express'),
	app = express.Router();

module.exports = (function(){
	app.get('/', require(__dirname+"/controllers/index"));

	app.route('/contact')
	.get(require(__dirname+"/controllers/contact")._AllContact)
	.post(require(__dirname+"/controllers/contact")._saveContact);

	app.route('/contact/:contactId')
	.get(require(__dirname+"/controllers/contact")._detailContact)
	.put(require(__dirname+"/controllers/contact")._editContact)
	.delete(require(__dirname+"/controllers/contact")._deleteContact);

	return app;
})();