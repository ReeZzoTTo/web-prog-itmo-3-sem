import java.util.List;

public class JsonBuilder {
    private final StorageHistory storageHistory;


    public JsonBuilder(StorageHistory storageHistory) {
        this.storageHistory = storageHistory;
    }

    private String shotToJson(Shot shot) {
        return "{"
            + "\"x\":" + shot.getX() + ","
            + "\"y\":" + shot.getY() + ","
            + "\"r\":" + shot.getR() + ","
            + "\"isHit\":" + shot.isHit()
            + "\"timestamp\":" + shot.getTimestamp() + ","
            + "}";
    }

    private String historyToJson() {
        StringBuilder json = new StringBuilder("[");

        List<Shot> shoots = this.storageHistory.getAll();

        for (int i = 0; i < shoots.size(); i++) {

            if (i > 0) {
                json.append(",");
            }

            json.append(shotToJson(shoots.get(i)));
        }

        json.append("]");

        return json.toString();
    }

    public String buildJsonResponse(Shot shot) {
        return "{"
            + "\"shot\":" + shotToJson(shot) + ","
            + "\"history\":" + historyToJson()
            + "}";
    }
}
