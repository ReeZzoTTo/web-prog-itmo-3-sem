public class Shot {
    private final double x;
    private final double y;
    private final double r;

    private final boolean isHit;

    public Shot(
        double x,
        double y,
        double r,
        boolean isHit
    ) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
    }

    public double getX() { return this.x; }
    
    public double getY() { return this.y; }

    public double getR() { return this.r; }

    public boolean isHit() { return this.isHit; }
}
