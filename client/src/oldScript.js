class CanvasGraphics {
    selectors = {
        canvasGraphics: "#canvas-graphics"
    }

    colors = {
        lightBlue: "#4eacfa",
        black: "#000000",
        shootColorMiss: "#8b0000",
        shootColorHit: "#0c8b00"
    }

    constructor() {
        this.canvasGraphics = document.querySelector(this.selectors.canvasGraphics)
        this.ctx = this.canvasGraphics.getContext("2d")

        this.canvasWidth = this.canvasGraphics.width
        this.canvasHeight = this.canvasGraphics.height

        this.render()
        
    }

    fillBackground() {
        this.ctx.fillStyle = "#f0f0f0"
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    shoot({x, y, r}) {
        // this.render()
        const isHit = this.checkShoot(x, y, r)

        this.drawShoot(x, y, r, isHit)
        
        return isHit
    }

    render() {
        this.fillBackground()
        this.initAxisData(180)
        this.drawArea()
        this.drawMainAxis()
        this.drawNumbers()
        this.drawXYEndings()
    }

    drawShoot(x, y, r, isHit) {
        const dotMultiplier = this.radius / r

        x = this.axisXPos + x * dotMultiplier
        y = this.axisYPos - y * dotMultiplier        

        this.ctx.beginPath()
        this.ctx.fillStyle = isHit 
            ? this.colors.shootColorHit 
            : this.colors.shootColorMiss

        this.ctx.arc(x, y, 4, 0, 2 * Math.PI)
        this.ctx.fill()

        this.ctx.closePath()
    }

    checkShoot(x, y, r) {
        const triangleCheckSector = -(r - x)

        if (
            (x < -r || x > r) || (y < -r || y > r)
            || (x < 0 && y > 0)
            || (x > 0 && y < 0 && x > triangleCheckSector && y < triangleCheckSector)
            || (x < 0 && y < 0 && (x**2 + y**2 > r**2))
        ) {
            return false
        }

        return true
    }

    drawXYEndings() {
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

    drawMainAxis() {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.black
        this.ctx.moveTo(this.canvasWidth / 2, this.canvasHeight)
        this.ctx.lineTo(this.canvasWidth / 2, 0)

        this.ctx.moveTo(0, this.canvasHeight / 2)
        this.ctx.lineTo(this.canvasWidth, this.canvasHeight / 2)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawAxisPointX(x, y) {
        this.ctx.moveTo(x, y - 5)
        this.ctx.lineTo(x, y + 5)
    }

    drawAxisPointY(x, y) {
        this.ctx.moveTo(x - 5, y)
        this.ctx.lineTo(x + 5, y)
    }

    drawRect() {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.lightBlue
        this.ctx.fillRect(this.axisXPos, this.axisYPos - this.radius, this.radius, this.radius)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawTriangle() {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.lightBlue

        this.ctx.moveTo(this.axisXPos, this.axisYPos)
        this.ctx.lineTo(this.axisXPos, this.axisYPos + this.radius)
        this.ctx.lineTo(this.axisXPos + this.radius, this.axisYPos)
        this.ctx.lineTo(this.axisXPos, this.axisYPos)

        this.ctx.closePath()
        this.ctx.fill()
    }

    drawCircle() {
        this.ctx.fillStyle = this.colors.lightBlue

        this.ctx.beginPath()

        this.ctx.moveTo(this.axisXPos, this.axisYPos)
        this.ctx.arc(this.axisXPos, this.axisYPos, this.radius, Math.PI / 2, Math.PI, false)

        this.ctx.fill()

        this.ctx.closePath()
    }

    initAxisData(radius) {
        const axisXPos = this.canvasWidth / 2
        const axisYPos = this.canvasHeight / 2

        this.middleStepX = (radius * 2 / 4)
        this.middleStepY = (radius * 2 / 4)
        this.radius = radius

        this.axisXPos = axisXPos
        this.axisYPos = axisYPos
    }

    drawAxisPoints() {
        const startingCoordX = this.axisXPos - this.radius
        const startingCoordY = this.axisYPos - this.radius

        this.ctx.beginPath()

        for (let i = 0; i < 5; i++) {
            if (i === 2) {
                continue
            }
            this.drawAxisPointX(startingCoordX + this.middleStepX * i, this.axisYPos)
            this.drawAxisPointY(this.axisXPos, startingCoordY + this.middleStepX * i)
        } 

        this.ctx.stroke()
        this.ctx.closePath()

    }

    drawArea() {
        this.drawRect()
        this.drawTriangle()
        this.drawCircle()
        this.drawAxisPoints()
    }

    drawNumbers() {
        const startingCoordX = this.axisXPos - this.radius
        const startingCoordY = this.axisYPos - this.radius

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

class ShootsTable {
    selectors = {
        tableBody: "[data-js-shoot-list]"
    }

    storageKey = "shoots"

    update() {
        const shoots = JSON.parse(
            localStorage.getItem(this.storageKey)
        )
        let innerString = ""
        let counter = 0

        if (shoots) {
            for (const timestamp of Object.keys(shoots)) {
                const shootData = shoots[timestamp]
                const date = new Date(+timestamp)

                innerString += `
                    <tr class="shoot-tr">
                        <td>${date.toLocaleDateString("ru-RU")}</td>
                        <td>${date.toLocaleTimeString("ru-RU")}</td>
                        <td>${shootData.x}</td>
                        <td>${shootData.y}</td>
                        <td>${shootData.r}</td>
                        <td>${shootData.isHit 
                            ? '<p class="hit-true">Попадание</p>' 
                            : '<p class="hit-false">Промах</p>'}
                        </td>
                    </tr>
                `
                counter++
            }
        } else {
            this.canvasGraphics.render()
        }

        if (counter < 7) {
            innerString += `
            <tr class="shoot-tr">
                <td colspan="6" empty>0</td>
            </tr>
        `.repeat(7 - counter)
        }
            
        this.shootList.innerHTML = innerString
    }

    clear() {
        localStorage.removeItem(this.storageKey)
        this.update()
    }

    constructor(canvasObj) {
        this.canvasGraphics = canvasObj

        this.shootList = document.querySelector(this.selectors.tableBody)

        this.update()
    }
}

class ButtonHandler {
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

class App {
    constructor() {
        this.main()
    }

    main() {
        const canvasGraphics = new CanvasGraphics()
        const shootsTable = new ShootsTable(canvasGraphics)
        new FormValidation(canvasGraphics, shootsTable)
        new SelectionR()
        new ButtonHandler(shootsTable)

    }    
}

new App()

