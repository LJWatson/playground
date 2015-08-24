function init()
{
	
	// Check for API support.
	if(window.SpeechSynthesisUtterance === undefined)
	{
		alert("Speech API not supported");
	} else
	{
		document.getElementById("button").addEventListener("click", speakUtterance);
	}
}

function speakUtterance(event)
{
	
	// Create speech object.
	var utterance = new SpeechSynthesisUtterance();
	utterance.text = "Tequila";
	
	// Speak utterance.
	window.speechSynthesis.speak(utterance);
}

window.onload = init;