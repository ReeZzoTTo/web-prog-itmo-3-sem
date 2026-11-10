import java.util.Arrays;

public class RequestValidator {
    public void validate(ShotRequest request) {
        double x = request.getX();
        double y = request.getY();
        double r = request.getR();

        StringBuilder validationErrorMessage = new StringBuilder("");

        if (x < -4 || x > 4) {
            validationErrorMessage.append("X must between -4 and 4. ");
        }

        if (y < -5 || y > 5) {
            validationErrorMessage.append("Y must be between -5 and 5. ");
        }

        if (!Arrays.asList(1.0, 1.5, 2.0, 2.5, 3.0).contains(r)) {
            validationErrorMessage.append("R must be in 1.0, 1.5, 2.0, 2.5, 3.0. ");
        }

        if (validationErrorMessage.length() > 0) {
            throw new IllegalArgumentException(validationErrorMessage.toString());
        }
    }
}
