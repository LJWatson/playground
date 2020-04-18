(function () {
    'use strict';

    function init() {

        if (window.SpeechSynthesisUtterance === undefined) {
            alert("This browser does not support the Web Speech API");
        } else {

            // Get all elements in the a-scene.
            var allSceneElements = document.getElementById("scene").children;
            var sceneElements = Array.from(allSceneElements);

            // Get count of elements and splice to remove (3) non-visible elements.
            var sceneElementsCount = sceneElements.length;
            sceneElements.splice(sceneElementsCount - 3, sceneElementsCount);
            var sceneElementsLength = sceneElements.length;

            // Set up scene description.
            var sceneDesc = "The scene contains ";

            var i;
            for (i = 0; i < sceneElementsLength; i++) {

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
                        sceneDesc += " a " + colour + " " + name + ",";
                    }
                    else {
                        sceneDesc += " " + colour + " " + name + ",";
                    }
                }
                else {
                    if (name !== "sky" && name !== "ground") {
                        sceneDesc += " and a " + colour + " " + name + ".";
                    }
                    else {
                        sceneDesc += " and " + colour + " " + name + ".";
                    }
                }
            }
            console.log(sceneDesc);

            // Create the speech object and content to speak.
            var utterance = new SpeechSynthesisUtterance();
            utterance.text = sceneDesc;
            window.speechSynthesis.speak(utterance);
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        init();
    });

})();