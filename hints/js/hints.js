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

		if (window.SpeechSynthesisUtterance === undefined)
		{
			alert("This browser doesn't support the Web Speech API");
		}
		else
		{
			
			//Get all elements with data-hint attribute.
			var hints = document.querySelectorAll('[data-hint]'), 
			hoverTimeout;
			
			var speakHint = function (e)
			{
				var msg = new SpeechSynthesisUtterance(e.target.dataset.hint);
				window.speechSynthesis.speak(msg);
			};
			
			//Iterate through hints to add listener.
			hints.forEach(function (hint)
			{
				
				hint.addEventListener('focus', function (e)
				{
					window.clearTimeout(hoverTimeout);
					hoverTimeout = window.setTimeout(speakHint, 500, e);
				});
				
				hint.addEventListener('blur', function ()
				{
					window.clearTimeout(hoverTimeout);
				})
					
				hint.addEventListener('mouseover', function (e)
				{
					window.clearTimeout(hoverTimeout);
					hoverTimeout = window.setTimeout(speakHint, 500, e);
				});
				
				hint.addEventListener('mouseout', function ()
				{
					window.clearTimeout(hoverTimeout);
				})
			});
		}
	}
	
	document.addEventListener("DOMContentLoaded", function ()
	{
		addHints();
	});
	})();