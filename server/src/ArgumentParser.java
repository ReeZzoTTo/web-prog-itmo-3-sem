import java.util.HashMap;
import java.util.Map;

public class ArgumentParser {
    public ShotRequest getArguments(String urlParamsString) {
        Map<String, String> params = new HashMap<>();

        if (urlParamsString == null || urlParamsString.isEmpty()) {
            throw new IllegalArgumentException("Query Parameters are not exist");
        }

        try {

            for (String pair : urlParamsString.split("&")) {
                String[] splitted = pair.split("=", 2);
                params.put(splitted[0], splitted[1]);
            }

            double x = Double.parseDouble(params.get("x"));
            double y = Double.parseDouble(params.get("y"));
            double r = Double.parseDouble(params.get("r"));

            return new ShotRequest(x, y, r);
            
        } catch (Error e) {
            throw new IllegalArgumentException();
        }
    }
}
