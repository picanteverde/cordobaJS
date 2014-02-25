(function(){
	jQuery(function($){
		$("input#sendJob").on("click", function(e){
			$.ajax({
				url:"/sendJob",
				dataType: "json",
				method:"POST",
				data: {
					functionBody: $("textarea#job").val()
				}
			}).done(function(resp){
				$.ajax({
					url: "/sendArgs/"+ resp.id,
					dataType: "json",
					method: "POST",
					data: {
						args: $("textarea#parameters").val()
					}
				});
			});
		});
		var socket = io.connect('http://localhost');
		socket.on('resp', function (resp) {
			var txt = $("#console").text();
			$("#console").text(resp.result.join(", ")+txt);
		});
	});
})();