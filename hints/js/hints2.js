(function ()
{
	
	function addHints ()
	{
		
		//Put JS into strict mode.
		'use strict';

		// Add foreach capability.
		if (typeof NodeList.prototype.forEach === 'undefined')
		{
			NodeList.prototype.forEach = Array.prototype.forEach;
		}
		
		//Get all elements with data-hint attribute.
		var hints = document.querySelectorAll('[data-hint]');
		
		var speakHint = function (e)
		{
			alert(e.target.dataset.hint);
		};

		//Iterate through hints to add listener.
		hints.forEach(function (hint)
		{
			hint.addEventListener("click", speakHint);
		});

	}

	document.addEventListener("DOMContentLoaded", function ()
	{
addHints();
	});
})();
