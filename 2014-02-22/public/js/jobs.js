(function(){
	var label,
		emit = function(jobId,argsId, results){
			var div = $("<div />");
			div.html(results.join(", "));
			div.prependTo(document.body);
			return $.ajax({
					url: "/sendResult/"+jobId + "/" + argsId,
					dataType:"json",
					method: "POST",
					data: {
						results: results
					}
				});
		},
		execute = function(id, func){
			$.ajax({
				url: "/getParams/"+ id,
				dataType: "json"
			}).done(function(res){
				if(res.done){
					label.html("<h1>No more Jobs to process</h1>").appendTo(document.body);
				}else{
					emit(id,res.idx, func.apply(null,res.args.split(","))).done(function(){
						execute(id, func);
					});
				}
			});
		};

	jQuery(function($){
		label = $("<div/>");
		$.ajax({
			url: "/getJob",
			dataType: "json"
		}).done(function(resp){
			if(resp.nojobs){
				label.html("<h1>No Jobs Created yet!</h1>").appendTo(document.body);
			}else{
				try{
					var func = new Function(resp.functionBody);
				}catch(e){
					label.html("<h1>Error:</h1><h2>"+e.message + "</h2>").appendTo(document.body);
				}
				execute(resp.id, func);
			}
		});
	});
})();