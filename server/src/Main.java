public class Main {

    private static ArgumentParser argumentParser = new ArgumentParser();
    private static HitChecker hitChecker = new HitChecker();
    private static StorageHistory storageHistory = new StorageHistory();

    public static void main(String[] args) {
        processShot("x=3&y=0&r=1.5");
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

}
