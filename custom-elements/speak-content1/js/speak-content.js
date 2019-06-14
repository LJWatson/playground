/*
 * Author: Léonie Watson @LeonieWatson
 * Notes: Autonomous custom element + shadow DOM
 * State: Experimental (not intended for production)
 */

class SpeakContent extends HTMLElement {

    constructor() {
        super();

        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        var control = this.shadowRoot.querySelector("button");
        var controlLabel = this.querySelector("[slot='control']").textContent;
        control.setAttribute("aria-pressed", "false");
        var speak = this.querySelector("div");
        var speakContent = speak.textContent;

        control.addEventListener("click", speakThis);

        function speakThis(e) {
            if (control.getAttribute("aria-pressed") == "false") {
                control.setAttribute("aria-pressed", "true");

                var utterance = new SpeechSynthesisUtterance();
                utterance.text = speakContent;
                window.speechSynthesis.speak(utterance);

                setTimeout(resetPressedState, 500);
            }
        }

        function resetPressedState() {
            if (window.speechSynthesis.speaking === false) {
                control.setAttribute("aria-pressed", "false");
            }
            else {
                setTimeout(resetPressedState, 500);
            }
        }
    }

    disconnectedCallback() {
        this.removeEventListener("click", speakContent);
    }
}

const template = document.createElement("template");
template.innerHTML =
    `<style>
#control {
    display: inline-block;
    min-height: 15px;
    font-size: 1.1em;
    font-weight: bold;
    padding: 10px 15px;
    margin: 20px auto;
    color: #ccc;
    background-color: #555;
    border: 0 none;
    border-radius: 3px;
    text-shadow: 0 - 1px 0 #000;
    box-shadow: 0 1px 0 #666, 0 2px 0 #444, 0 6px 6px rgba(0, 0, 0, 0.6);
}

#control:hover, #control:focus {
    background-color: #820bbb;
}

#control[aria-pressed="true"] {
    color: #fff;
    padding: 11px 12px 9px 16px;
    text-shadow: 0 -1px 0 #444, 0 0 5px #ffd, 0 0 8px #fff;
    box-shadow: 0 1px 0 #666, 0 2px 0 #444, 0 2px 2px rgba(0, 0, 0, 0.9);
}
</style>

    <button id="control">
        <slot name="control"></slot>
    </button>
<slot name="speak" id="speak"></slot>`;

customElements.define("speak-content", SpeakContent);