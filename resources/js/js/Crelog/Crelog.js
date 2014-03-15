// TODO, log levels

var CreJs = CreJs || {};

(function()
{
	var log = CreJs.Crelog = CreJs.Crelog || {};
	
	log.Logger = function()
	{
		this.log = function(logData)
		{
			console.log(logData);
		};
	};	
}());