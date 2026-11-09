public class ShotRequest {
    private final double x;
    private final double y;
    private final double r;

    public ShotRequest(
        double x,
        double y,
        double r
    ) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public double getX() { return this.x; }
    
    public double getY() { return this.y; }

    public double getR() { return this.r; }
}
