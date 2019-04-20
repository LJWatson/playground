class ToggleButton extends HTMLElement {
    constructor() {
        super();
        console.log("New toggle Button has been instantiated.");

        var shadow = this.attachShadow({ mode: "open" });

        var button = document.createElement("span");
        var text = this.getAttribute("text");


        // set up the toggle-button
        button.setAttribute("role", "button");
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-pressed", "false");
        button.textContent = text;


        // Add functionality
        function toggle() {
            if (button.getAttribute("aria-pressed") == "false") {
                button.setAttribute("aria-pressed", "true");
            }
            else {
                button.setAttribute("aria-pressed", "false");
            }
        }

        // Addmouse and keyboard event listeners
        button.addEventListener("click", toggle);
        button.addEventListener("keydown", function (e) {
            if (e.keyCode == 13 || e.keyCode == 32) {
                toggle();
            }
        });

        shadow.appendChild(button);

    }
}

customElements.define("toggle-button", ToggleButton);
