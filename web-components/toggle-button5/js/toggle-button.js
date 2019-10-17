/*
 * Author: Léonie Watson @LeonieWatson
 * Notes: Autonomous custom element with disabled attribute
 * State: Experimental (not intended for production)
 */

class ToggleButton extends HTMLElement {

    constructor() {
        super();
        console.log("New toggle Button has been constructed");
    }

    connectedCallback() {
        this.setAttribute("tabindex", "0");
        this.setAttribute("role", "button");
        this.setAttribute("aria-pressed", "false");
this.setAttribute("disabled", "true");

        this.addEventListener("click", togglePressed);
        this.addEventListener("keydown", function (e) {
            if (e.keyCode == 13 || e.keyCode == 32) {
                togglePressed();
            }
        });
    }

    disconnectedCallback() {
        this.removeEventListener("keydown", togglePressed);
        this.removeEventListener("click", togglePressed);
    }
}

function togglePressed() {
    if (this.getAttribute("aria-pressed") == "false") {
        this.setAttribute("aria-pressed", "true");
    } else {
        this.setAttribute("aria-pressed", "false");
    }
}

customElements.define("toggle-button", ToggleButton);