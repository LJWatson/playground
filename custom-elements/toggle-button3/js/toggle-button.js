/*
 * Author: Léonie Watson @LeonieWatson
 * Notes: Customised custom element
 * State: Experimental (not intended for production)
 */

class ToggleButton extends HTMLButtonElement {

    constructor() {
        super();
        console.log("New toggle Button has been constructed");
    }

    connectedCallback() {
        this.setAttribute("aria-pressed", "false");

        this.addEventListener("click", togglePressed);

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

customElements.define("toggle-button", ToggleButton, { extends: "button" });