export class ButtonHandler {
    selectors = {
        clearButton: ".clear-button"
    }

    bindEvents() {
        const clearButton = document.querySelector(this.selectors.clearButton)

        clearButton.addEventListener("click", (event) => {
            this.shootsTable.clear()
        })
    }

    constructor(shootsTable) {
        this.shootsTable = shootsTable
        this.bindEvents()
    }
}