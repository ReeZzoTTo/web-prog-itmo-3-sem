export class ShootApi {
    serverHandlerAddress = "/fcgi-bin/shoot"

    async sendShoot({x, y, r}) {
        const urlParams = new URLSearchParams({
            x: String(x),
            y: String(y),
            r: String(r)
        })

        const response = await fetch(`${this.serverHandlerAddress}?${urlParams.toString()}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })

        const jsonData = await response.json()

        if (!response.ok) {
            throw new Error(
                jsonData.error || `HTTP Error: ${response.status}`
            )
        }

        return jsonData
    }
}
