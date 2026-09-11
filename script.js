class CanvasGraphics {
    selectors = {
        canvasGraphics: "#canvas-graphics"
    }

    colors = {
        lightBlue: "#4eacfa",
        black: "#000000",
        shootColor: "#8b0000"
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
        const axisXPos = this.canvasHeight / 2
        const axisYPos = this.canvasWidth / 2
        this.midleStepX = (radius * 2 - (this.canvasWidth - radius * 2)) / 4
        this.midleStepY = (radius * 2 - (this.canvasHeight - radius * 2)) / 4
        this.radius = radius

        this.axisXPos = axisXPos
        this.axisYPos = axisYPos
    }

    drawAxisPoints = () => {

        this.ctx.beginPath()
        this.drawAxisPointX(this.radius * 2, this.axisYPos)
        this.drawAxisPointX(this.axisXPos + this.midleStepX, this.axisYPos)
        this.drawAxisPointX(this.canvasWidth - this.radius * 2, this.axisYPos)
        this.drawAxisPointX(this.axisXPos - this.midleStepX, this.axisYPos)
        this.ctx.stroke()
        this.ctx.closePath()
        
        this.ctx.beginPath()
        this.drawAxisPointY(this.axisXPos, this.radius * 2)
        this.drawAxisPointY(this.axisXPos, this.axisYPos + this.midleStepY)
        this.drawAxisPointY(this.axisXPos, this.canvasHeight - this.radius * 2)
        this.drawAxisPointY(this.axisXPos, this.axisYPos - this.midleStepY)
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
        this.ctx.beginPath()

        const startingCoordX = this.canvasWidth - this.radius * 2
        const startingCoordY = this.canvasHeight - this.radius * 2

        this.ctx.font = "16px Arial"
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "top"

        this.ctx.fillText("-R", startingCoordX, this.axisXPos + 7)
        this.ctx.fillText("-R/2", startingCoordX + this.midleStepX, this.axisXPos + 7)
        this.ctx.fillText("R/2", startingCoordX + this.midleStepX * 3, this.axisXPos + 7)
        this.ctx.fillText("R", startingCoordX + this.midleStepX * 4, this.axisXPos + 7)

        this.ctx.textAlign = "left"

        this.ctx.fillText("R", this.axisYPos + 7, startingCoordY - 7)
        this.ctx.fillText("R/2", this.axisYPos + 7, startingCoordY - 7 + this.midleStepY)
        this.ctx.fillText("-R/2", this.axisYPos + 7, startingCoordY - 7 + this.midleStepY * 3)
        this.ctx.fillText("-R", this.axisYPos + 7, startingCoordY - 7 + this.midleStepY * 4)

        this.ctx.closePath()
    }

    setPoints = (low, high) => {
        const pointsArray = new Array()

        for (let i = low; i <= high; i++) {
            pointsArray.push(i)
        }
    
        this.points = [ ...pointsArray]
    }

    getPointsDifference = () => {
        return Math.max(...this.points) - Math.min(...this.points)
    }

    constructor() {
        this.canvasGraphics = document.querySelector(this.selectors.canvasGraphics)
        this.ctx = this.canvasGraphics.getContext("2d")
        this.setPoints(-5, 5)

        this.canvasWidth = this.canvasGraphics.clientWidth
        this.canvasHeight = this.canvasGraphics.clientHeight

        this.ctx.fillStyle = "#dadada"
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

        this.initAxisData(190)

        this.numberMultiplier = (this.radius * 2 - this.axisXPos) / this.getPointsDifference()

        this.drawArea()
        this.drawMainAxis()
        this.drawNumbers()
        this.drawXYEndings()
    }
}

class ButtonHandler {
    selectors = {
        buttonR: ".button-R"
    }

    onButtonClick = (event) => {
        const buttonList = document.querySelectorAll(".button-R")

        const { target } = event

        if (target.matches(this.selectors.buttonR)) {
            buttonList.forEach(element => {
                element.classList.remove("btn-active")
            });

            target.classList.toggle("btn-active")
            console.log(target.value)
        }

    }

    bindEvents = () => {
        document.addEventListener('click', (event) => { 
            this.onButtonClick(event) 
        })
    }

    constructor() {
        this.bindEvents()
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
        numberInvalid: () => "Диапазон числа: [-5; 3]"
    }

    onBlur(event) {
        const { target } = event
        const isFormField = target.closest(this.selectors.shootForm)
        const isRequired = target.required

        if (isFormField && isRequired) {
            this.validateField(target)
        }

    }

    manageErrors(fieldControlElement, errorMessages) {
        const fieldErrorsElement = fieldControlElement.parentElement.querySelector(this.selectors.fieldErrors)
        
        fieldErrorsElement.innerHTML = errorMessages
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('')
    
    }

    validateField(fieldControlElement) {
        const errors = fieldControlElement.validity
        const errorMessages = []
        const value = Number(fieldControlElement.value)

        if (fieldControlElement.name === "coordinate__y" && (value < -5 || value > 3)) {
            errorMessages.push(this.errorMessages.numberInvalid())
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

    bindEvents() {
        document.addEventListener("blur", (event) => this.onBlur(event), { capture: true })
        
    }

    constructor() {
        this.shootForm = document.forms.shoot__form
        this.bindEvents()
    }
}

new CanvasGraphics()
new FormValidation()
new ButtonHandler()