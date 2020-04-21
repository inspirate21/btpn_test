var $model = require(__dirname+"/model");

module.exports.getContactList = function(limit, offset, callback){
	var condition = {
		fields : "count(*)"
	}

	$model.select("contact", condition).then(function(count){
		var result = {
			row : count[0].count,
			data : []
		}

		condition.fields = "*";
		$model.select("contact", condition).then(function(bank){
			result.data = bank;

			return callback(null, result);
		}).catch(function(err){
			return callback(err, null);
		})
	}).catch(function(err){
		return callback(err, null);
	})
}

module.exports.saveContact = function(param){
	console.log(param);

	return $model.insert("contact", param);
}

module.exports.editContact = function(param){
	return $model.update("contact", param, ["id"]);
}

module.exports.getAllContact = function(){
	var condition = {
		fields : "*"
	}
	return $model.select("contact", condition);
}

module.exports.getContactById = function(id){
	var condition = {
		where : "id = $1",
		one : true
	}

	return $model.select("contact", condition, [id]);
}

module.exports.deleteContact = function(param){
	return $model.delete("contact", param);
}
