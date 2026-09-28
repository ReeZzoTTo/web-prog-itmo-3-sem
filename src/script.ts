interface Coordinates {
    x: number, 
    y: number, 
    r: number
}

interface ShootData extends Coordinates {
    timestamp: number,
    isHit: boolean
}

interface ShootsState {
    [timestamp: string]: ShootData
}

type FormControl = HTMLInputElement | HTMLSelectElement

function isFormControl(target: EventTarget | null): target is FormControl {
    return target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement
}

type ErrorMessageKey = "valueMissing" | "patternMismatch"

type GetErrorMessage = (element: FormControl) => string

class CanvasGraphics {
    private canvasGraphics: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private canvasWidth: number
    private canvasHeight: number

    private axisXPos: number = 0
    private axisYPos: number = 0

    private middleStepX: number = 0
    private middleStepY: number = 0

    private radius: number = 0

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
        const canvas = document.querySelector<HTMLCanvasElement>(this.selectors.canvasGraphics)
        
        if (!canvas) {
            throw new Error("Canvas element not found")
        }

        const ctx = canvas.getContext("2d")

        if (!ctx) {
            throw new Error("Ctx object was not initialized")
        }

        this.canvasGraphics = canvas
        this.ctx = ctx

        this.canvasWidth = this.canvasGraphics.width
        this.canvasHeight = this.canvasGraphics.height

        this.render()
    }

    fillBackground(): void {  
        this.ctx.fillStyle = "#f0f0f0"
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    shoot({x, y, r}: Coordinates): boolean {
        this.render()
        const isHit = this.checkShoot(x, y, r)

        this.drawShoot(x, y, r, isHit)
        
        return isHit
    }

    render(): void {
        this.fillBackground()
        this.initAxisData(180)
        this.drawArea()
        this.drawMainAxis()
        this.drawNumbers()
        this.drawXYEndings()
    }

    drawShoot(x: number, y: number, r: number, isHit: boolean): void {
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

    checkShoot(x: number, y: number, r: number): boolean {
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

    drawXYEndings(): void {
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

    drawMainAxis(): void {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.black
        this.ctx.moveTo(this.canvasWidth / 2, this.canvasHeight)
        this.ctx.lineTo(this.canvasWidth / 2, 0)

        this.ctx.moveTo(0, this.canvasHeight / 2)
        this.ctx.lineTo(this.canvasWidth, this.canvasHeight / 2)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawAxisPointX(x: number, y: number): void {

        this.ctx.moveTo(x, y - 5)
        this.ctx.lineTo(x, y + 5)
    }

    drawAxisPointY(x: number, y: number): void {
        this.ctx.moveTo(x - 5, y)
        this.ctx.lineTo(x + 5, y)
    }

    drawRect(): void {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.lightBlue
        this.ctx.fillRect(this.axisXPos, this.axisYPos - this.radius, this.radius, this.radius)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawTriangle(): void {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.lightBlue

        this.ctx.moveTo(this.axisXPos, this.axisYPos)
        this.ctx.lineTo(this.axisXPos, this.axisYPos + this.radius)
        this.ctx.lineTo(this.axisXPos + this.radius, this.axisYPos)
        this.ctx.lineTo(this.axisXPos, this.axisYPos)

        this.ctx.closePath()
        this.ctx.fill()
    }

    drawCircle(): void {
        this.ctx.fillStyle = this.colors.lightBlue

        this.ctx.beginPath()

        this.ctx.moveTo(this.axisXPos, this.axisYPos)
        this.ctx.arc(this.axisXPos, this.axisYPos, this.radius, Math.PI / 2, Math.PI, false)

        this.ctx.fill()

        this.ctx.closePath()
    }

    initAxisData(radius: number): void {
        const axisXPos = this.canvasWidth / 2
        const axisYPos = this.canvasHeight / 2

        this.middleStepX = (radius * 2 / 4)
        this.middleStepY = (radius * 2 / 4)
        this.radius = radius

        this.axisXPos = axisXPos
        this.axisYPos = axisYPos
    }

    drawAxisPoints(): void {

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

    drawArea(): void {
        this.drawRect()
        this.drawTriangle()
        this.drawCircle()
        this.drawAxisPoints()
    }

    drawNumbers(): void {
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

    bindEvents(): void {
        document.addEventListener("click", (event: MouseEvent) => this.onButtonClick(event))
    }

    onButtonClick(event: MouseEvent): void {
        const { target } = event

        if (!(target instanceof Element)) { return }

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
    private shootForm: HTMLFormElement
    private canvasGraphics: CanvasGraphics
    private shootsTableControler: ShootsTable

    selectors = {
        shootForm: "[data-js-shoot-form]",
        fieldErrors: "[data-js-form-field-errors]",
    }

    errorMessages: Record<ErrorMessageKey, GetErrorMessage> = {
        valueMissing: () => "Пожалуйста, заполните это поле",

        patternMismatch: (element: FormControl) => 
            element instanceof HTMLInputElement
            ? element.title || "Данные не соответствуют формату"
            : "Данные не соответствуют формату"       
    }

    customErrorMessages = {
        numberInvalid:"Диапазон числа: [-5; 3]",
        buttonSelect: "Необходимо выбрать одно из значений от 1 до 5"
    }

    storageKey = "shoots"

    constructor(canvasObj: CanvasGraphics, shootsTableControl: ShootsTable) {
        const shootForm = document.querySelector<HTMLFormElement>(this.selectors.shootForm)
        
        if(!shootForm) {
            throw new Error("shootForm not found")
        } 

        this.canvasGraphics = canvasObj
        this.shootsTableControler = shootsTableControl
        this.shootForm = shootForm
    
        this.bindEvents()
    }

    bindEvents(): void {
        document.addEventListener("blur", (event: FocusEvent) => this.onBlur(event), { capture: true })
        document.addEventListener("submit", (event: SubmitEvent) => this.onSubmit(event))
    }
    
    onBlur(event: FocusEvent): void {
        const { target } = event
        if (!isFormControl(target)) { return }

        const isFormField = target.closest(this.selectors.shootForm)
        const isRequired = target.required

        if (isFormField && isRequired) {
            this.validateField(target)
        }
    }

    onSubmit(event: SubmitEvent): void {
        event.preventDefault()
        const { target } = event

        if (!(target instanceof HTMLFormElement)) { return }

        const isFormElement = target.matches(this.selectors.shootForm)

        if (!isFormElement) {
            return
        }

        const requiredControlElements = Array.from(this.shootForm.elements)
            .filter((element): element is FormControl => {
                return isFormControl(element) && element.required
            })
        let isFormValid = true
        let firstInvalidElement: FormControl | null = null
        
        for (const element of requiredControlElements) {
            const isFieldValid = this.validateField(element)

            if (!isFieldValid) {
                isFormValid = false

                if (!firstInvalidElement) {
                    firstInvalidElement = element
                }
            }
        }

        const btnRElements = document.querySelectorAll<HTMLButtonElement>(".button-R")
        const btnRList = Array.from(btnRElements)
            .filter((button) => button.classList.contains("btn-active")
        )

        let isButtonSelected = btnRList.length > 0
        const buttonErrorField = document.querySelector("[data-js-select-r-errors]")

        if (!buttonErrorField) { return }

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

            const formState: ShootData = {
                timestamp: timestamp,
                x: target.coordinate__x.value,
                y: target.coordinate__y.value,
                r: Number(btnRList[0].value),
                isHit: false
            }

            formState.isHit = this.canvasGraphics.shoot(formState)
            
            const localStorageShootsItem = localStorage.getItem(this.storageKey)
            let currentShootsState: ShootsState = {}
            
            if (localStorageShootsItem) {
                currentShootsState = JSON.parse(localStorageShootsItem)
            }

            if (!currentShootsState) {
                currentShootsState = {}
            }
            currentShootsState[formState.timestamp] = formState
            
            if (Object.keys(currentShootsState).length >= 8) {
                const firstElId = Object.keys(currentShootsState)[0]
                delete currentShootsState[firstElId]
            }
            
            localStorage.setItem(this.storageKey, JSON.stringify(currentShootsState))

            this.shootsTableControler.update()
        }
    }

    manageErrors(fieldControlElement: Element, errorMessages: string[]): void {      
        const errorsId = fieldControlElement.getAttribute("aria-errormessage")
        
        if (!errorsId) {
            throw new Error("Invalid errors ID")
        }

        const fieldErrorsElement = document.getElementById(errorsId)

        if (!fieldErrorsElement) {
            throw new Error(`Can not to find HTMLElement by id ${errorsId}`)
        }

        fieldErrorsElement.innerHTML = errorMessages
            .map((message) => `<span class="field__error">${message}</span>`)
            .join('')
    }

    validateField(fieldControlElement: FormControl): boolean {
        const errors: ValidityState = fieldControlElement.validity
        const errorMessages: string[] = []
        const value = Number(fieldControlElement.value)

        if (fieldControlElement.name === "coordinate__y" && (value < -5 || value > 3)) {
            errorMessages.push(this.customErrorMessages.numberInvalid)
        }

        const validityErrors: ErrorMessageKey[] = ["patternMismatch", "valueMissing"]

        for (const errorType of validityErrors) {
            if (errors[errorType]) {
                errorMessages.push(this.errorMessages[errorType](fieldControlElement))
            }
        }

        const isValid = errorMessages.length === 0

        this.manageErrors(fieldControlElement, errorMessages)

        return isValid
    }
}

class ShootsTable {
    private shootList: HTMLTableSectionElement

    selectors = {
        tableBody: "[data-js-shoot-list]"
    }

    storageKey = "shoots"

    update(): void {
        const localStorageShootsState = localStorage.getItem(this.storageKey)
        let shoots: ShootsState | null = null
        
        if (localStorageShootsState) {
            shoots = JSON.parse(localStorageShootsState)
        }
        
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

    clear(): void {
        localStorage.removeItem(this.storageKey)
        this.update()
    }

    constructor() {
        const shootList = document.querySelector<HTMLTableSectionElement>(this.selectors.tableBody)

        if (!shootList) {
            throw new Error(`Can not find an HTMLElement with attribute: ${this.selectors.tableBody}`)
        }

        this.shootList = shootList

        this.update()
    }
}

class ButtonHandler {
    private shootsTable: ShootsTable

    selectors = {
        clearButton: ".clear-button"
    }

    bindEvents(): void {
        const clearButton = document.querySelector<HTMLButtonElement>(this.selectors.clearButton)

        if (!clearButton) {
            throw new Error("Can not to find clear button element")
        }

        clearButton.addEventListener("click", () => {
            this.shootsTable.clear()
        })
    }

    constructor(shootsTable: ShootsTable) {
        this.shootsTable = shootsTable
        this.bindEvents()
    }
}

class App {
    constructor() {
        this.main()
    }

    main(): void {
        const canvasGraphics = new CanvasGraphics()
        const shootsTable = new ShootsTable()
        new FormValidation(canvasGraphics, shootsTable)
        new SelectionR()
        new ButtonHandler(shootsTable)
    }    
}

new App()