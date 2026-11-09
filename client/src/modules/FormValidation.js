export class FormValidation {
    selectors = {
        shootForm: "[data-js-shoot-form]",
        fieldErrors: "[data-js-form-field-errors]",
        radioButton: 'input[name="select-r"]'
    }

    errorMessages = {
        valueMissing: () => "Пожалуйста, заполните это поле",
        patternMismatch: ({ title }) => title || "Данные не соответствуют формату",
    }

    customErrorMessages = {
        numberInvalid:"Диапазон числа: [-5; 5]",
        buttonSelect: "Необходимо выбрать одно из значений от -4 до 4"
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
        document.addEventListener("change", (event) => this.onChange(event))
        document.addEventListener("radioRadius", (event) => this.onRadioRadius(event))
    }
    
    onBlur(event) {
        const { target } = event
        const isFormField = target.closest(this.selectors.shootForm)
        const isRequired = target.required

        if (isFormField && isRequired) {
            this.validateField(target)
        }
    }

    onChange(event) {
        const { target } = event
        
        if (target.matches(this.selectors.radioButton)) {
            target.dispatchEvent(
                new CustomEvent("radioRadius", {
                    bubbles: true,
                    detail: {
                        value: target.value
                    }
                })
            )
        }
    }

    onRadioRadius(event) {
        this.canvasGraphics.render()

        this.canvasGraphics.traceShoots(
            JSON.parse(localStorage.getItem(this.storageKey)), 
            event.detail.value
        )
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

        const btnXElements = document.querySelectorAll(".button-X")
        
        const btnXList = Array.from(btnXElements)
            .filter((button) => button.classList.contains("btn-active")
        )

        let isButtonSelected = btnXList.length > 0
        const buttonErrorField = document.querySelector("[data-js-select-x-errors]")

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
                x: Number(btnXList[0].value),
                y: target.coordinate__y.value,
                r: target["select-r"].value,
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

        if (fieldControlElement.name === "coordinate__y" && (value < -5 || value > 5)) {
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