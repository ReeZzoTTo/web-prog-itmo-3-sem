export class FormButtonSelection {
    selectors = {
        buttonX: ".button-X"
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

        if (target.matches(this.selectors.buttonX)) {
            const buttonList = document.querySelectorAll(this.selectors.buttonX)
            const wasActive = target.classList.contains(this.activeClass)

            buttonList.forEach(element => {
                element.classList.remove(this.activeClass)
            });

            target.classList.toggle(this.activeClass, !wasActive)
        }
    }
}