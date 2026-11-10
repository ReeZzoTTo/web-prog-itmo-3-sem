import java.nio.charset.StandardCharsets;
import java.time.Instant;
import com.fastcgi.FCGIInterface;

public class Main {

    private final static ArgumentParser argumentParser = new ArgumentParser();
    private final static HitChecker hitChecker = new HitChecker();
    private final static StorageHistory storageHistory = new StorageHistory();
    private final static JsonBuilder jsonBuilder = new JsonBuilder(storageHistory);
    private final static RequestValidator requestValidator = new RequestValidator();

    public static void main(String[] args) {

        FCGIInterface fcgi = new FCGIInterface();

        while (fcgi.FCGIaccept() >= 0) {
            long startTime = System.nanoTime();

            try {
                String query = System.getProperty("QUERY_STRING", "");

                ShotRequest shotRequest = argumentParser.getArguments(query);

                requestValidator.validate(shotRequest);

                Shot shot = processShot(shotRequest);

                double executionTime = (System.nanoTime() - startTime) / 1_000_000.0;

                String currentTime = Instant.now().toString();

                String responseJson = jsonBuilder.buildJsonResponse(shot, currentTime, executionTime);

                sendResponse("200 OK", responseJson);

            } catch (IllegalArgumentException e) {
                String errorJson = jsonBuilder.buildErrorResponse(e.getMessage(), Instant.now().toString(), (System.nanoTime() - startTime) / 1_000_000.0);

                sendResponse("400 Bad Request", errorJson);
            } catch (Exception e) {
                String errorJson = jsonBuilder.buildErrorResponse(e.getMessage(), Instant.now().toString(), (System.nanoTime() - startTime) / 1_000_000.0);

                sendResponse("500 Internal Server Error", errorJson);
            }

        }

    }

    private static Shot processShot(ShotRequest shotRequest) {
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

    private static void sendResponse(String status, String json) {
        byte[] body = json.getBytes(StandardCharsets.UTF_8);

        System.out.print("HTTP/1.1 " + status + "\r\n");

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
