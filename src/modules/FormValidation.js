export class FormValidation {
    selectors = {
        shootForm: "[data-js-shoot-form]",
        fieldErrors: "[data-js-form-field-errors]",
    }

    errorMessages = {
        valueMissing: () => "Пожалуйста, заполните это поле",
        patternMismatch: ({ title }) => title || "Данные не соответствуют формату",
    }

    customErrorMessages = {
        numberInvalid:"Диапазон числа: [-5; 3]",
        buttonSelect: "Необходимо выбрать одно из значений от 1 до 5"
    }

    storageKey = "shoots"

    constructor(canvasObj, shootsTableControl) {
        this.shootForm = document.forms.shoot__form
        this.canvasGraphics = canvasObj
        this.shootsTableControler = shootsTableControl
        this.bindEvents()
    }

    bindEvents() {
        document.addEventListener("blur", (event) => this.onBlur(event), { capture: true })
        document.addEventListener("submit", (event) => this.onSubmit(event))
    }
    
    onBlur(event) {
        const { target } = event
        const isFormField = target.closest(this.selectors.shootForm)
        const isRequired = target.required

        if (isFormField && isRequired) {
            this.validateField(target)
        }
    }

    onSubmit(event) {
        event.preventDefault()
        const { target } = event

        const isFormElement = target.matches(this.selectors.shootForm)

        if (!isFormElement) {
            return
        }

        const requiredControlElements = [...this.shootForm.elements]
            .filter(({ required }) => required)
        let isFormValid = true
        let firstInvalidElement = null

        for (const element of requiredControlElements) {
            const isFieldValid = this.validateField(element)

            if (!isFieldValid) {
                isFormValid = false

                if (!firstInvalidElement) {
                    firstInvalidElement = element
                }
            }
        }

        const btnRElements = document.querySelectorAll(".button-R")
        const btnRList = Array.from(btnRElements)
            .filter((button) => button.classList.contains("btn-active")
        )

        let isButtonSelected = btnRList.length > 0
        const buttonErrorField = document.querySelector("[data-js-select-r-errors]")

        if (!isButtonSelected) {
            isFormValid = false
            buttonErrorField.innerHTML = `<span class="field__error">${this.customErrorMessages.buttonSelect}</span>`
        } else {
            buttonErrorField.innerHTML = ''
        }

        if (!isFormValid) {
            event.preventDefault()

            if(firstInvalidElement) {
                firstInvalidElement.focus()
            }        
        } else {
            const timestamp = Date.now()

            const formState = {
                timestamp: timestamp,
                x: target.coordinate__x.value,
                y: target.coordinate__y.value,
                r: Number(btnRList[0].value),
                isHit: false
            }

            formState.isHit = this.canvasGraphics.checkShoot(formState.x, formState.y, formState.r)

            const localStorageShootsItem = localStorage.getItem(this.storageKey)
            let currentShootsState = {}
            
            if (localStorageShootsItem) {
                currentShootsState = JSON.parse(localStorageShootsItem)
            }

            if (!currentShootsState) {
                currentShootsState = {}
            }

            this.canvasGraphics.render()
            currentShootsState[formState.timestamp] = formState
            
            for (const curShootData of Object.keys(currentShootsState)) {
                const curY = Number(currentShootsState[curShootData].y)
                const curX = Number(currentShootsState[curShootData].x)

                this.canvasGraphics.shoot({x: curX, y: curY, r: formState.r})
            }

            localStorage.setItem(this.storageKey, JSON.stringify(currentShootsState))

            this.shootsTableControler.update()
        }
    }

    manageErrors(fieldControlElement, errorMessages) {      
        const errorsId = fieldControlElement.getAttribute("aria-errormessage")
        const fieldErrorsElement = document.getElementById(errorsId)

        fieldErrorsElement.innerHTML = errorMessages
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('')
    }

    validateField(fieldControlElement) {
        const errors = fieldControlElement.validity
        const errorMessages = []
        const value = Number(fieldControlElement.value)

        if (fieldControlElement.name === "coordinate__y" && (value < -5 || value > 3)) {
            errorMessages.push(this.customErrorMessages.numberInvalid)
        }

        Object.entries(this.errorMessages).forEach(([ errorType, getErrorMessage ]) => {
            if (errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldControlElement))
            }
        })

        const isValid = errorMessages.length === 0

        this.manageErrors(fieldControlElement, errorMessages)

        return isValid
    }
}