(function() {
'use strict';

function init() {

if (window.SpeechSynthesisUtterance === undefined) {
        alert("This browser does not support the Web Speech API");
    } else {

var allSceneElements = document.getElementById("scene").children;
var sceneElements = Array.from(allSceneElements);
sceneElements.splice(4, 6);
var sceneElementsLength = sceneElements.length;

var sceneDesc = "The scene contains ";

var i;
for (i = 0; i < sceneElementsLength -1; i++) {
var name = sceneElements[i].tagName.slice(1);
var colour = sceneElements[i].getAttribute("color");
 
sceneDesc += "a " +  colour + " " + name + ", ";
}

    sceneDesc += "and " + sceneElements[sceneElementsLength -1].getAttribute("color") + " " + sceneElements[sceneElementsLength -1].tagName.slice(1) + ".";

var utterance = new SpeechSynthesisUtterance();
utterance.text = sceneDesc;
window.speechSynthesis.speak(utterance);
}
}

document.addEventListener("DOMContentLoaded", function() {
    init();
});
    
})();