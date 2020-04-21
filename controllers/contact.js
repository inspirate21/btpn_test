var response = require(__dirname+"/../utils/response"),
	util = require(__dirname+"/../utils/util"),
	$contactModel = require(__dirname+"/../models/contact");


module.exports._AllContact = function(req, res, next){
  $contactModel.getAllContact().then(function(contact){
    var result = [];
    for(var i=0; i<contact.length; i++){
      result.push({
        id : contact[i].id,
        firstName : contact[i].firstname,
        lastName : contact[i].lastname,
        age : contact[i].age,
        photo : contact[i].photo,
      });
    }

    return response.success(res, result);
  }).catch(function(err){
    return response.error(res, null, err);
  });
}

module.exports._saveContact = function(req, res, next){
  var param = {
    firstname : req.body.firstName,
    lastname : req.body.lastName,
    age : req.body.age,
    photo : req.body.photo ? req.body.photo : null
  }

  if(!util.checkParameters(param)){
    return response.error(res, "miss_param");
  }

  $contactModel.saveContact(param).then(function(){
    return response.success(res, true, "contact saved");
  }).catch(function(err){
    return response.error(res, null, err);
  });
}

module.exports._detailContact = function(req, res, next){
  var param = {
    id : req.params.contactId
  }

  if(!util.checkParameters(param)){
    return response.error(res, "miss_param");
  }

  $contactModel.getContactById(param.id).then(function(contact){
    var result = {
      firstName : contact.firstname,
      lastName : contact.lastname,
      age : contact.age,
      photo : contact.photo ? contact.photo : null
    }

    return response.success(res, result);
  }).catch(function(err){
    return response.error(res, null, err);
  })
}

module.exports._deleteContact = function(req, res, next){
  var param = {
    id : req.params.contactId
  }

  if(!util.checkParameters(param)){
    return response.error(res, "miss_param");
  }

  $contactModel.deleteContact(param).then(function(){
    return response.success(res, null, "contact deleted");
  }).catch(function(err){
    return response.error(res, null, err);
  });
}

module.exports._editContact = function(req, res, next){
  var param = {
    id : req.params.contactId,
    firstname : req.body.firstName,
    lastname : req.body.lastName,
    age : req.body.age,
    photo : req.body.photo
  }

  if(!util.checkParameters(param)){
    return response.error(res, "miss_param");
  }

  $contactModel.editContact(param).then(function(){
    return response.success(res, param, "contact edited");
  }).catch(function(err){
    return response.error(res, null, err);
  });
}