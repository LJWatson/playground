class ToggleButton extends HTMLElement {
    constructor() {
        super();
        console.log("New toggle Button has been instantiated.");

        // set up the toggle-button
        this.setAttribute("role", "button");
        this.setAttribute("tabindex", "0");
        this.setAttribute("aria-pressed", "false");

        // Add functionality
        function toggle() {
            if (this.getAttribute("aria-pressed") == "false") {
                this.setAttribute("aria-pressed", "true");
            }
            else {
                this.setAttribute("aria-pressed", "false");
            }
        }

        // Addmouse and keyboard event listeners
        this.addEventListener("click", toggle);
        this.addEventListener("keydown", function (e) {
            if (e.keyCode == 13 || e.keyCode == 32) {
                toggle();
            }
        });

    }
}

customElements.define("toggle-button", ToggleButton);
