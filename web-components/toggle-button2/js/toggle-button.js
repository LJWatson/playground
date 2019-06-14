/*
 * Author: Léonie Watson @LeonieWatson
 * Notes: Autonomous custom element with AOM syntax
 * State: Experimental behind flags (not intended for production)
 */

class ToggleButton extends HTMLElement {

    constructor() {
        super();
        console.log("New toggle Button has been constructed");
    }

    connectedCallback() {
        this.tabindex = "0";
        this.role = "button";
        this.ariaPressed = "false";

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
    if (this.ariaPressed == "false") {
        this.ariaPressed = "true";
    } else {
        this.ariaPressed = "false";
    }
}

customElements.define("toggle-button", ToggleButton);