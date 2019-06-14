/*
 * Author: Léonie Watson @LeonieWatson
 * Notes: Customised custom element (extends button)
 * State: Experimental (not intended for production)
 */

class ToggleButton extends HTMLButtonElement {
    constructor() {
        super();
       
    }

    connectedCallback() {
        this.addEventListener("click", doSomething);
    }

    disconnectedCallback() {
        this.removeEventListener("click", togglePressed);
    }
}

customElements.define("toggle-button", ToggleButton, { extends: "button" });