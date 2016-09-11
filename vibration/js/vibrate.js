(function() {
    'use strict';

    function init() {

        if ("vibrate" in navigator) {

            var vibrateOnce = function(e) {
                window.navigator.vibrate(500);
                vibrateVisualiser(500);
            };

            var vibrateTwice = function(e) {
                window.navigator.vibrate([500, 500, 500]);
                vibrateVisualiser([500, 500, 500]);
            };

            var vibrateMore = function(e) {
                window.navigator.vibrate([500, 500, 500, 500, 500]);
                vibrateVisualiser([500, 500, 500, 500, 500]);
            };

            document.getElementById("v1").addEventListener("click", vibrateOnce);
            document.getElementById("v2").addEventListener("click", vibrateTwice);
            document.getElementById("v3").addEventListener("click", vibrateMore);
        } else {
            alert("This browser does not support the Vibration API");
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        init();
    });
})();

(function () {
    'use strict';

    var AudioContext = window.AudioContext || window.webkitAudioContext,
        audioCtx = new AudioContext(),
        oscillator,
        oscillatorType = 'square',
        oscillatorFrequency = 90,
        gainNode,
        audioPlaying = false,
        visualToggleClass = 'vibrate-on';

    window.vibrateVisualiser = function (vibratePattern, vibrate) {
        if (!Array.isArray(vibratePattern)) {
            vibratePattern = [vibratePattern];
        }
        var viualisers = document.querySelectorAll('[data-vibrate-visualiser]'),
            viualiserI,
            viualiserL = viualisers.length,
            vibratePatternI,
            vibratePatternL = vibratePattern.length,
            timeElapsed;

        if (vibratePattern[0] > 0) {
            for (viualiserI = 0; viualiserI < viualiserL; viualiserI++) {
                toggle(viualisers[viualiserI]);
            }
        }
        
        for (vibratePatternI = 0, timeElapsed = 0; vibratePatternI < vibratePatternL; vibratePatternI++) {
            timeElapsed += vibratePattern[vibratePatternI];
            for (viualiserI = 0; viualiserI < viualiserL; viualiserI++) {
                window.setTimeout(toggle, timeElapsed, viualisers[viualiserI]);
            }
        }
        
        if (vibrate && "vibrate" in navigator) {
            window.navigator.vibrate(vibratePattern);
        }
    };

    function toggle (visualiser) {
        visualToggle(visualiser);
        audioToggle();
    }

    function visualToggle (visualiser) {
        visualiser.classList.toggle(visualToggleClass);
    }

    function audioToggle () {
        if (audioCtx) {
            if (audioPlaying) {
                oscillator.stop();
            }
            else {
                oscillator = audioCtx.createOscillator();
                gainNode = audioCtx.createGain();
                oscillator.connect(gainNode);
                gainNode.connect(audioCtx.destination);
                oscillator.type = oscillatorType; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
                oscillator.frequency.value = oscillatorFrequency;
                oscillator.start();
            }
            audioPlaying = !audioPlaying;
        }
    }

})();