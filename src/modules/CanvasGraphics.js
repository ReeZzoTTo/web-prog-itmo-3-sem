export class CanvasGraphics {
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
        this.ctx.fillRect(this.axisXPos - this.radius, this.axisYPos - this.radius / 2, this.radius, this.radius / 2)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawTriangle() {
        this.ctx.beginPath()

        this.ctx.fillStyle = this.colors.lightBlue

        this.ctx.moveTo(this.axisXPos, this.axisYPos)
        this.ctx.lineTo(this.axisXPos, this.axisYPos + this.radius)
        this.ctx.lineTo(this.axisXPos - this.radius / 2, this.axisYPos)
        this.ctx.lineTo(this.axisXPos, this.axisYPos)

        this.ctx.closePath()
        this.ctx.fill()
    }

    drawCircle() {
        this.ctx.fillStyle = this.colors.lightBlue

        this.ctx.beginPath()

        this.ctx.moveTo(this.axisXPos, this.axisYPos)
        this.ctx.arc(this.axisXPos, this.axisYPos, this.radius, -Math.PI / 2, 0, false)

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