(function () {
    'use strict';

    function init() {

        // Set recognition interface to SpeechRecognition regardless of browser.
        window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

        // Create SpeechRecognition and SpeechSynthesisUtterance objects.
        var recognition = new SpeechRecognition();
        var utterance = new SpeechSynthesisUtterance();

        var allSceneElements = document.getElementById("scene").children;
        var sceneElements = Array.from(allSceneElements);

        document.body.onclick = function () {
            utterance.text = "Hello. Would you like me to describe the scene?";
            window.speechSynthesis.speak(utterance);
            listen();
        }

        function listen() {
            recognition.start();
            recognition.continuous = false;
            recognition.interimResults = false;
        }

        function speak(response) {
            utterance.text = response + ". What else do you want to know?";
            window.speechSynthesis.speak(utterance);
        }

        recognition.onresult = function (event) {
            var transcript = event.results[0][0].transcript;

            if (transcript.includes("yes")) {
                describeScene();
            }
            else if (transcript.includes("many")) {
                countSpheres();
            }

            //speak(transcript);
        }

        function describeScene() {
            var response = "The scene contains ";

            var i;
            for (i = 0; i < sceneElements.length; i++) {

                // Get the element name; remove the a- and convert to lowercase.
                var name = sceneElements[i].tagName.slice(2).toLowerCase();

                // Get the element's colour.
                var colour = sceneElements[i].getAttribute("color");

                // Change element names to more descriptive form if necessary.
                if (name === "box") {
                    name = "cube";
                }

                if (name === "plane") {
                    name = "ground";
                }

                if (i != sceneElements.length - 1) {

                    // Check the name and change the preposition if necessary.
                    if (name !== "sky" && name !== "ground") {
                        response += " a " + colour + " " + name + ",";
                    }
                    else {
                        response += " " + colour + " " + name + ",";
                    }
                }
                else {
                    if (name !== "sky" && name !== "ground") {
                        response += " and a " + colour + " " + name + ".";
                    }
                    else {
                        response += " and " + colour + " " + name + ".";
                    }
                }

            }

            speak(response);
        }

        function countSpheres() {
            speak("There is 1 sphere");
        }
        recognition.onend = function () {
            listen();
        };
    }

    document.addEventListener("DOMContentLoaded", function () {
        init();
    });

})();
