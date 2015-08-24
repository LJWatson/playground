var tts;
var voices;

function init()
{	
	
	// Check for API support.
	if(window.SpeechSynthesisUtterance === undefined)
	{
		alert("Speech API not supported");
	} else
	{ 

		// Workaround for Chrome bug (getVoices() fails onload).
		var watch = setInterval(function()
		{
			
			// Retrieve and display available TTS engines.
			tts = speechSynthesis.getVoices();
			voices = document.getElementById("tts");
			
			if(tts.length !== 0)
			{
				
				for(var i = 0; i < tts.length; i++)
				{
					
					voices.innerHTML += '<option value="' + tts[i].name + '">' + tts[i].name + '</option>';
				}
				
				clearInterval(watch);
			}
		}, 1);
		
		// Retrieve p elements with tabindex.
		var elements = document.querySelectorAll("p[tabindex]");
		
		for(var i = 0; i < elements.length; i++)
		{
			elements[i].addEventListener("focus", speakThis, false); 
		}
	}
}

function speakThis(event)
{
	
	// Retrieve currently selected TTS.
	var selectedTTS = voices.selectedIndex;
	
	// Retrieve currently focused element.
	var element = document.activeElement;
	
	// Retrieve styles for the currently focused element.
	var style = element.getAttribute("style");

	// Retrieve content of currently focused element.
	var content = element.innerHTML;

	// Create utterance object.
	var utterance = new SpeechSynthesisUtterance();
	utterance.text = content;
	utterance.voice = tts[selectedTTS];

	// Check whether CSS speak property is normal".
	if(style.indexOf("normal") > 0)
	{
		utterance.volume = 0.6;
		utterance.rate = 1;
		utterance.pitch = 1;
		// Change utterance volume based on value of CSS voice-volume property.
		if(style.indexOf("loud") > 0)
		{
			utterance.volume = 1;
		}
		else
		{

			if(style.indexOf("soft") > 0)
			{
				utterance.volume = 0.3;
			}
		}

		// Change utterance rate based on value of CSS voice-rate property.
		if(style.indexOf("fast") > 0)
		{
			utterance.rate = 2;
		}
		else
		{

			if(style.indexOf("slow") > 0)
			{
				utterance.rate = 0.5;
			}
		}

		// Change utterance pitch based on value of CSS voice-pitch property.
		if(style.indexOf("high") > 0)
		{
			utterance.pitch = 2;
		}
		else
		{

			if(style.indexOf("low") > 0)
			{
				utterance.pitch = 0.5;
			}
		}

		window.speechSynthesis.speak(utterance);
	}

}

window.onload = init;
