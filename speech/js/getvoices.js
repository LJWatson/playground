(function() {
    'use strict';

    function init() {

        // Check for Web Speech support.
        if (window.SpeechSynthesisUtterance === undefined) {
            alert("Speech API not supported");
        } else {
            var tts;

            // Workaround for Chrome bug (getVoices() fails onload).
            var watch = setInterval(function() {

                // Retrieve and display available TTS engines.
                tts = speechSynthesis.getVoices();
                var voices = document.getElementById("voices");

                if (tts.length !== 0) {

                    for (var i = 0; i < tts.length; i++) {

                        voices.innerHTML += '<option value="' + tts[i].name + '">' + tts[i].name + '</option>';
                    }

                    clearInterval(watch);
                }
            }, 1);

            document.getElementById("button").addEventListener('click', function(event) {

                // Retrieve index of selected TTS engine.
                var selectedVoice = voices.selectedIndex;

                // Create speech object.
                var utterance = new SpeechSynthesisUtterance();
                utterance.text = voices[selectedVoice].text;


                // Assign selected TTS engine to speech object.
                utterance.voice = tts[selectedVoice];

                // Speak utterance.
                window.speechSynthesis.speak(utterance);
            });
        }
    }

    document.addEventListener("DOMContentLoaded", function() {
        init();
    });

})();