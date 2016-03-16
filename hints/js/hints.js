(function() {
    'use strict';

    var hints, hoverTimeout, speakHint;

    function init() {

        // Add foreach capability.
        if (typeof NodeList.prototype.forEach === 'undefined') {
            NodeList.prototype.forEach = Array.prototype.forEach;
        }

        //Get all elements with data-hint attribute.
        hints = document.querySelectorAll('[data-hint]'), hoverTimeout;
		
		// Create speech callback.	  
        speakHint = function(e) {
            var msg = new SpeechSynthesisUtterance(e.target.dataset.hint);
            window.speechSynthesis.speak(msg);
        };

        document.getElementById('checkbox').addEventListener('click', toggleHints);
    }

    function toggleHints() {

        if (!checkbox.getAttribute('checked')) {
            enableHints();
            checkbox.setAttribute('checked', true);
        } else {
            disableHints();
            checkbox.removeAttribute('checked');
        }
    }

    function focusEventListener(e) {
        hoverTimeout = window.setTimeout(speakHint, 500, e);
    }

    function blurEventListener(e) {
        window.clearTimeout(hoverTimeout);
    }

    function mouseoverEventListener(e) {
        hoverTimeout = window.setTimeout(speakHint, 500, e);
    }

    function mouseoutEventListener(e) {
        window.clearTimeout(hoverTimeout);
    }

    function enableHints() {

		// Check for Web Speech support.
		if (window.SpeechSynthesisUtterance === undefined) {
            alert("This browser doesn't support the Web Speech API");
        } else {

            //Iterate through hints to add listener.
            hints.forEach(function(hint) {

                hint.addEventListener('focus', focusEventListener);
                hint.addEventListener('blur', blurEventListener);
                hint.addEventListener('mouseover', mouseoverEventListener);
                hint.addEventListener('mouseout', mouseoutEventListener);

            });
        }
    }

    function disableHints() {

        //Iterate through hints to remove listener.
        hints.forEach(function(hint) {

            hint.removeEventListener('focus', focusEventListener);
            hint.removeEventListener('blur', blurEventListener);
            hint.removeEventListener('mouseover', mouseoverEventListener);
            hint.removeEventListener('mouseout', mouseoutEventListener);
        });
    }

    document.addEventListener("DOMContentLoaded", function() {
        init();
    });
})();
