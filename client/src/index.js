import { ButtonHandler } from "./modules/ButtonHandler.js"
import { CanvasGraphics } from "./modules/CanvasGraphics.js"
import { FormButtonSelection } from "./modules/FormButtonSelection.js"
import { FormValidation } from "./modules/FormValidation.js"
import { ShootsTable } from "./modules/ShootsTable.js"
import { ShootApi } from "./modules/ShootApi.js"

class App {
    constructor() {
        this.main()
    }

    main() {
        const canvasGraphics = new CanvasGraphics()
        const shootApi = new ShootApi()
        const shootsTable = new ShootsTable()
        const formValidation = new FormValidation(canvasGraphics, shootsTable, shootApi)
        
        new FormButtonSelection()
        new ButtonHandler(formValidation)
    }    
}

export default App