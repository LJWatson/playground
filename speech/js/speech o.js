function init()
{
	
	// Check for API support.
	if(window.SpeechSynthesisUtterance === undefined)
	{
		alert("Speech API not supported");
	} else
	{
		document.getElementById("button").addEventListener("click", displayVoices);
	}
}

function displayVoices(event)
{
	
	var tts;

	// Workaround for Chrome bug (getVoices() fails onload).
	var watch = setInterval(function()
	{

		// Retrieve and display available TTS engines.
		tts = speechSynthesis.getVoices();
		var voices = document.getElementById("voices");
		
		if(tts.length !== 0)
		{
			
			for(var i = 0; i < tts.length; i++)
			{
				voices.innerHTML += tts[i].name + '<br>';
			}

			clearInterval(watch);
		}
	}, 1);
}

window.onload = init;