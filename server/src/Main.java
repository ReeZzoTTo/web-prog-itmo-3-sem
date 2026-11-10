import java.nio.charset.StandardCharsets;

import com.fastcgi.FCGIInterface;

public class Main {

    private final static ArgumentParser argumentParser = new ArgumentParser();
    private final static HitChecker hitChecker = new HitChecker();
    private final static StorageHistory storageHistory = new StorageHistory();
    private final static JsonBuilder jsonBuilder = new JsonBuilder(storageHistory);

    public static void main(String[] args) {

        FCGIInterface fcgi = new FCGIInterface();

        while (fcgi.FCGIaccept() >= 0) {
            String query = System.getProperty("QUERY_STRING", "");

            Shot shot = processShot(query);

            String responseJson = jsonBuilder.buildJsonResponse(shot);

            sendResponse(responseJson);

        }

    }

    private static Shot processShot(String query) {
        ShotRequest shotRequest = argumentParser.getArguments(query);

        boolean isHit = hitChecker.check(shotRequest);

        Shot shot = new Shot(
            shotRequest.getX(),
            shotRequest.getY(),
            shotRequest.getR(),
            isHit
        );

        storageHistory.add(shot);

        return shot;
    }

    private static void sendResponse(String json) {
        byte[] body = json.getBytes(StandardCharsets.UTF_8);

        System.out.print("HTTP/1.1 200 OK\r\n");

        System.out.print(
            "Content-Type: application/json; charset=UTF-8\r\n"
        );

        System.out.print(
            "Content-Length: " + body.length + "\r\n"
        );

        System.out.print("Cache-Control: no-store\r\n");
        System.out.print("\r\n");

        System.out.write(body, 0, body.length);

        System.out.flush();
    }
}
