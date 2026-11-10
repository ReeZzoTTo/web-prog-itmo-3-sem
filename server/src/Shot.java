public class Shot {
    private final double x;
    private final double y;
    private final double r;

    private final boolean isHit;
    private final long timestamp;

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
        this.timestamp = System.currentTimeMillis();
    }

    public double getX() { return this.x; }
    
    public double getY() { return this.y; }

    public double getR() { return this.r; }

    public boolean isHit() { return this.isHit; }

    public long getTimestamp() { return this.timestamp; }
}
