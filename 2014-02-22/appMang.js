module.exports = function(app, jm){
	app.get("/getJob", function(req, res, next){
		res.end(JSON.stringify(jm.getJob()));
	});

	app.get("/getParams/:id", function(req, res, next){
		res.end(JSON.stringify(jm.getNextArgs()))	
	})

	app.post("/sendResult/:jobId/:argId", function(req, res, next){
		//console.log(req.body.results);
		jm.addResp(req.params.jobId, req.params.argId, req.body.results);
		res.end(JSON.stringify({status:"ok"}));
	});

	app.post("/sendJob", function(req,res, next){
		var idx = jm.addJob({
			id: jm.getNextId(),
			functionBody: req.body.functionBody
		});
		res.end(JSON.stringify({
			id: idx
		}));
	});

	app.post("/sendArgs/:id",function(req, res, next){
		var args = req.body.args.split("|");
		args.forEach(function(arg){
			jm.addArgs(req.params.id, arg);
		});
		res.end(JSON.stringify({status:"ok"}));
	});
};