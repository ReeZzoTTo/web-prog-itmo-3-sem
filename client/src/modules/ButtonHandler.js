export class ButtonHandler {
    selectors = {
        clearButton: ".clear-button"
    }

    bindEvents() {
        const clearButton = document.querySelector(this.selectors.clearButton)

        clearButton.addEventListener("click", () => {
            this.formValidation.clearHistory()
        })
    }

    constructor(formValidation) {
        this.formValidation = formValidation
        this.bindEvents()
    }
}