// TODO, log levels

var CreJs = CreJs || {};

(function()
{
	var log = CreJs.Crelog = CreJs.Crelog || {};
	
	log.Logger = function(writeToLog)
	{
		this.log = function(logData)
		{
			writeToLog(logData);
		};
	};	
}());