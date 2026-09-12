class CanvasGraphics {
    selectors = {
        canvasGraphics: "#canvas-graphics"
    }

    colors = {
        lightBlue: "#4eacfa",
        black: "#000000",
        shootColor: "#8b0000"
    }

    constructor() {
        this.canvasGraphics = document.querySelector(this.selectors.canvasGraphics)
        this.ctx = this.canvasGraphics.getContext("2d")
        this.pointsRange = {
            min: -5,
            max: 5
        }

        this.canvasWidth = this.canvasGraphics.width
        this.canvasHeight = this.canvasGraphics.height

        this.ctx.fillStyle = "#dadada"
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

        this.initAxisData(190)

        this.numberMultiplier = (this.radius * 2 - this.axisXPos) / (this.pointsRange.max - this.pointsRange.min)

        this.drawArea()
        this.drawMainAxis()
        this.drawNumbers()
        this.drawXYEndings()
    }

    drawShoot = (X, Y, R) => {
        X = this.axisXPos + X * this.numberMultiplier
        Y = this.axisYPos - Y * this.numberMultiplier
        R *= 1.5

        this.ctx.beginPath()
        this.ctx.fillStyle = this.colors.shootColor

        this.ctx.arc(X, Y, R, 0, 2 * Math.PI)
        this.ctx.fill()

        this.ctx.closePath()
    }

    drawXYEndings = () => {
        this.ctx.beginPath()
        
        this.ctx.moveTo(this.canvasWidth - 10, this.axisYPos - 5)
        this.ctx.lineTo(this.canvasWidth, this.axisYPos)

        this.ctx.moveTo(this.canvasWidth - 10, this.axisYPos + 5)
        this.ctx.lineTo(this.canvasWidth, this.axisYPos)

        this.ctx.moveTo(this.axisXPos - 5, 10)
        this.ctx.lineTo(this.axisXPos, 0)

        this.ctx.moveTo(this.axisXPos + 5, 10)
        this.ctx.lineTo(this.axisXPos, 0)

        this.ctx.stroke()
        
        this.ctx.font = "14px Arial"
        this.ctx.fillText("x", this.canvasWidth - 10, this.axisYPos + 5)
        this.ctx.fillText("y", this.axisXPos - 14, -2)
        
        this.ctx.closePath()
    }

    drawMainAxis = () => {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.black
        this.ctx.moveTo(this.canvasWidth / 2, this.canvasHeight)
        this.ctx.lineTo(this.canvasWidth / 2, 0)

        this.ctx.moveTo(0, this.canvasHeight / 2)
        this.ctx.lineTo(this.canvasWidth, this.canvasHeight / 2)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawAxisPointX = (x, y) => {
        this.ctx.moveTo(x, y - 5)
        this.ctx.lineTo(x, y + 5)
    }

    drawAxisPointY = (x, y) => {
        this.ctx.moveTo(x - 5, y)
        this.ctx.lineTo(x + 5, y)
    }

    drawRect = () => {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.lightBlue
        this.ctx.fillRect(200, 20, 180, 180)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawTriangle = () => {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.lightBlue

        this.ctx.moveTo(this.axisXPos, this.axisYPos)
        this.ctx.lineTo(this.axisXPos, this.radius * 2)
        this.ctx.lineTo(this.radius * 2, this.axisYPos)
        this.ctx.lineTo(this.axisXPos, this.axisYPos)

        this.ctx.closePath()
        this.ctx.fill()
    }

    drawCircle = () => {
        this.ctx.fillStyle = this.colors.lightBlue

        this.ctx.beginPath()

        this.ctx.moveTo(this.axisXPos, this.axisYPos)
        this.ctx.arc(this.axisXPos, this.axisYPos, this.radius * 2 - this.axisXPos, Math.PI / 2, Math.PI, false)

        this.ctx.fill()

        this.ctx.closePath()
    }

    initAxisData = (radius) => {
        const axisXPos = this.canvasWidth / 2
        const axisYPos = this.canvasHeight / 2
        this.middleStepX = (radius * 2 - (this.canvasWidth - radius * 2)) / 4
        this.middleStepY = (radius * 2 - (this.canvasHeight - radius * 2)) / 4
        this.radius = radius

        this.axisXPos = axisXPos
        this.axisYPos = axisYPos
    }

    drawAxisPoints = () => {

        this.ctx.beginPath()
        this.drawAxisPointX(this.radius * 2, this.axisYPos)
        this.drawAxisPointX(this.axisXPos + this.middleStepX, this.axisYPos)
        this.drawAxisPointX(this.canvasWidth - this.radius * 2, this.axisYPos)
        this.drawAxisPointX(this.axisXPos - this.middleStepX, this.axisYPos)
        this.ctx.stroke()
        this.ctx.closePath()
        
        this.ctx.beginPath()
        this.drawAxisPointY(this.axisXPos, this.radius * 2)
        this.drawAxisPointY(this.axisXPos, this.axisYPos + this.middleStepY)
        this.drawAxisPointY(this.axisXPos, this.canvasHeight - this.radius * 2)
        this.drawAxisPointY(this.axisXPos, this.axisYPos - this.middleStepY)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawArea = () => {
        this.drawRect()
        this.drawTriangle()
        this.drawCircle()
        this.drawAxisPoints()
    }

    drawNumbers = () => {
        const startingCoordX = this.canvasWidth - this.radius * 2
        const startingCoordY = this.canvasHeight - this.radius * 2

        this.ctx.font = "16px Arial"
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "top"

        this.ctx.fillText("-R", startingCoordX, this.axisXPos + 7)
        this.ctx.fillText("-R/2", startingCoordX + this.middleStepX, this.axisXPos + 7)
        this.ctx.fillText("R/2", startingCoordX + this.middleStepX * 3, this.axisXPos + 7)
        this.ctx.fillText("R", startingCoordX + this.middleStepX * 4, this.axisXPos + 7)

        this.ctx.textAlign = "left"

        this.ctx.fillText("R", this.axisYPos + 7, startingCoordY - 7)
        this.ctx.fillText("R/2", this.axisYPos + 7, startingCoordY - 7 + this.middleStepY)
        this.ctx.fillText("-R/2", this.axisYPos + 7, startingCoordY - 7 + this.middleStepY * 3)
        this.ctx.fillText("-R", this.axisYPos + 7, startingCoordY - 7 + this.middleStepY * 4)
    }

    
}

class SelectionR {
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

class FormValidation {
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

    constructor() {
        this.shootForm = document.forms.shoot__form
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

        requiredControlElements.forEach((element) => {
            const isFieldValid = this.validateField(element)

            if (!isFieldValid) {
                isFormValid = false
            }
        })

        const btnRElements = document.querySelectorAll(".button-R")
        const btnRList = [...btnRElements]
            .filter((button) => button.classList.contains("btn-active")
        )

        let isButtonSelected = btnRList.length > 0
        const buttonErrorField = document.querySelector("#select-r-errors")

        if (!isButtonSelected) {
            isFormValid = false
            buttonErrorField.innerHTML = `<span class="field__error">${this.customErrorMessages.buttonSelect}</span>`
        } else {
            buttonErrorField.innerHTML = ''
        }

        if (!isFormValid) {
            event.preventDefault()
            } else {
            const formData = new FormData(this.shootForm)
            console.log(...formData);
            alert("form send")
        }
        event.preventDefault()
    }

    manageErrors(fieldControlElement, errorMessages) {
        console.log(fieldControlElement.validity);
        
        const errorsId = fieldControlElement.getAttribute("aria-errormessage")
        const fieldErrorsElement = document.getElementById(errorsId)
        
        console.log(fieldControlElement.parentElement)

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

class App {
    state = {
        x: null,
        y: null,
        r: null,
        shoots: []
    }


    constructor() {
        this.main()
    }

    main() {
        const canvasGraphics = new CanvasGraphics()
        const formValidation = new FormValidation()
        const selectionR = new SelectionR()
    }    
}

new App()