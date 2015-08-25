(function ()
{

	function doThis ()
	{
		
		//Put JavaScript into strict mode.
		'use strict';
		
		if ("vibrate" in navigator)
		{
			var vibrateOnce = function (e)
			{
				window.navigator.vibrate(500);
			};
				
			var vibrateTwice = function (e)
			{
				window.navigator.vibrate([500, 500, 500]);
			};
			
			var vibrateMore = function (e)
			{
				window.navigator.vibrate([500, 500, 500, 500, 500]);
			};
			
			document.getElementById("v1").addEventListener("click", vibrateOnce);
			document.getElementById("v2").addEventListener("click", vibrateTwice);
			document.getElementById("v3").addEventListener("click", vibrateMore);
		} else
		{
			alert("This browser does not support the Vibration API");
		}
	}
	
	document.addEventListener('DOMContentLoaded', function ()
	{
		doThis();
	});
})();