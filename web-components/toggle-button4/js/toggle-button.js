/*
 * Author: Léonie Watson @LeonieWatson
 * Notes: Autonomous custom element with AOM syntax (custom elements API) 
 * State: Non-functional (no current browser implementations)
 */

class ToggleButton extends HTMLElement {

    constructor() {
        super();
        console.log("New toggle Button has been constructed");
    }

    connectedCallback() {
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

customElements.define("toggle-button", ToggleButton, { role: "button", tabIndex: "0", ariaPressed: "false" });