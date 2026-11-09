import { ButtonHandler } from "./modules/ButtonHandler.js"
import { CanvasGraphics } from "./modules/CanvasGraphics.js"
import { FormButtonSelection } from "./modules/FormButtonSelection.js"
import { FormValidation } from "./modules/FormValidation.js"
import { ShootsTable } from "./modules/ShootsTable.js"

class App {
    constructor() {
        this.main()
    }

    main() {
        const canvasGraphics = new CanvasGraphics()
        const shootsTable = new ShootsTable(canvasGraphics)
        new FormValidation(canvasGraphics, shootsTable)
        new FormButtonSelection()
        new ButtonHandler(shootsTable)
    }    
}

export default App