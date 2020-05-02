(function () {
'use strict';

function init() {

// Set recognition interface to SpeechRecognition regardless of browser.
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;

// Create SpeechRecognition and SpeechSynthesisUtterance objects.
const recognition = new SpeechRecognition();
const utterance = new SpeechSynthesisUtterance();

var button = document.getElementById("button");
var display = document.getElementById("display");

button.addEventListener("click", () => {
    listen();
console.log("Ready");
});

function listen () {
recognition.start();
recognition.continuous = false;
recognition.interimResults = false;
console.log("Listening");
}

recognition.onresult = function(event) {
var transcript = event.results[0][0].transcript;
display.innerText = transcript;
listen();
}

recognition.onend = function() {
    listen();
};


}

document.addEventListener("DOMContentLoaded", function () {
init();
});

})();
