var EventEmitter = require("events").EventEmitter;
	
module.exports = function(){
	var jm = new EventEmitter(),
		jobs = [],
		args = [];
	jm.addJob = function(job){
		var idx = jobs.length;
		jobs.push(job);
		return idx;
	};
	jm.getNextId = function(){
		return jobs.length;
	};
	jm.getJob = function(){
		if(jobs[0]){
			return jobs[0];
		}else{
			return {
				nojobs: true
			};
		}
	};
	jm.addArgs = function(jobId, arg){
		var ar = {
			jobId: jobId,
			idx: args.length,
			solved: false,
			args: arg

		};
		//console.log(ar);
		args.push(ar);
	};

	jm.addResp = function(jobId, idx, resp){
		var arrs = args.filter(function(arg){
			return (arg.jobId == jobId) && (arg.idx == idx);
		}),
		arg = arrs[0];

		arg.solved = true;
		jm.emit("resp", resp);
	}

	jm.getNextArgs = function(){
		var arr  = args.filter(function(arg){
			return !arg.solved;
		});
		return arr[0];
	};

	return jm;
};