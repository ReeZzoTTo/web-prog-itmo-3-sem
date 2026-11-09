public class HitChecker {
    
    public boolean check(ShotRequest shotRequest) {
        double x = shotRequest.getX();
        double y = shotRequest.getY();
        double r = shotRequest.getR();

        if (
            (x < -r || x > r) || (y < -r || y > r)
            || (x > 0 && y < 0)
            || (x < 0 && y < 0 && y < -2*x - r)
            || (x > 0 && y > 0 && (x*x + y*y > r*r))
            || (x < 0 && y > r/2 && y > 0)
        ) {
            return false;
        }

        return true;
    }
}
