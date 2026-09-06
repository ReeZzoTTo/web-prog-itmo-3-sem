class CanvasGraphics {
    selectors = {
        canvasGraphics: "#canvas-graphics"
    }

    drawMainAxis = () => {
        this.ctx.fillStyle = "#000000"
        this.ctx.moveTo(this.canvasWidth / 2, this.canvasHeight)
        this.ctx.lineTo(this.canvasWidth / 2, 0)

        this.ctx.moveTo(0, this.canvasHeight / 2)
        this.ctx.lineTo(this.canvasWidth, this.canvasHeight / 2)

        this.ctx.stroke()
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

        this.ctx.fillStyle = "#4eacfa"
        this.ctx.fillRect(200, 20, 180, 180)

        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawAxisPoints = (radius) => {
        const axisXPos = this.canvasHeight / 2
        const axisYPos = this.canvasWidth / 2
        const midleStepX = (radius * 2 - (this.canvasWidth - radius * 2)) / 4
        const midleStepY = (radius * 2 - (this.canvasHeight - radius * 2)) / 4

        this.ctx.beginPath()
        this.drawAxisPointX(radius * 2, axisYPos)
        this.drawAxisPointX(axisXPos + midleStepX, axisYPos)
        this.drawAxisPointX(this.canvasWidth - radius * 2, axisYPos)
        this.drawAxisPointX(axisXPos - midleStepX, axisYPos)
        this.ctx.stroke()
        this.ctx.closePath()
        
        this.ctx.beginPath()
        this.drawAxisPointY(axisXPos, radius * 2)
        this.drawAxisPointY(axisXPos, axisYPos + midleStepY)
        this.drawAxisPointY(axisXPos, this.canvasHeight - radius * 2)
        this.drawAxisPointY(axisXPos, axisYPos - midleStepY)
        this.ctx.stroke()
        this.ctx.closePath()
    }

    drawArea = () => {
        this.drawRect()
        // this.drawCircle()
        // this.drawTriangle()
        this.drawAxisPoints(190)
    }

    constructor() {
        this.canvasGraphics = document.querySelector(this.selectors.canvasGraphics)
        this.ctx = this.canvasGraphics.getContext("2d")

        this.canvasWidth = this.canvasGraphics.clientWidth
        this.canvasHeight = this.canvasGraphics.clientHeight

        this.ctx.fillStyle = "#dadada"
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

        this.drawArea()
        this.drawMainAxis()
    }
}

new CanvasGraphics()








