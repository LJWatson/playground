class ReadButton extends HTMLElement {
    constructor() {
        super();
        console.log("New read Button has been instantiated.");

        // set up the read button        
        this.setAttribute("role", "button");
        this.setAttribute("tabindex", "0");

        // Get content to be read.
        var contentRef = this.getAttribute("content");
        var content = document.getElementById(contentRef).innerText;

        // Add functionality
        function speakUtterance(e) {
            var utterance = new SpeechSynthesisUtterance();
            utterance.text = content;
            window.speechSynthesis.speak(utterance);

        }
        // Addmouse and keyboard event listeners
        this.addEventListener("click", speakUtterance);
        this.addEventListener("keydown", function (e) {
            if (e.keyCode == 13 || e.keyCode == 32) {
                speakUtterance();
            }
        });

    }
}

customElements.define("read-button", ReadButton);
