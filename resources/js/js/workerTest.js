onmessage = function(e)
{
	postMessage({xy : "x: " + e.data.clientX + ", y:" + e.data.clientY});
};