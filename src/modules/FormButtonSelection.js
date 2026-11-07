export class FormButtonSelection {
    selectors = {
        buttonR: ".button-R"
    }
    activeClass = "btn-active"

    constructor() {
        this.bindEvents()
    }

    bindEvents() {
        document.addEventListener("click", (event) => this.onButtonClick(event))
    }

    onButtonClick(event) {
        const { target } = event

        if (target.matches(this.selectors.buttonR)) {
            const buttonList = document.querySelectorAll(this.selectors.buttonR)
            const wasActive = target.classList.contains(this.activeClass)

            buttonList.forEach(element => {
                element.classList.remove(this.activeClass)
            });

            target.classList.toggle(this.activeClass, !wasActive)
        }
    }
}