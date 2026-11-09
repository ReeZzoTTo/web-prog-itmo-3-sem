import java.util.ArrayList;
import java.util.List;

public class StorageHistory {
    private final List<Shot> shootHistory = new ArrayList<>();

    public void add(Shot shot) {
        this.shootHistory.add(shot);
    }

    public List<Shot> getAll() {
        return new ArrayList<>(this.shootHistory);
    }

    public void clear() {
        this.shootHistory.clear();
    }
}
