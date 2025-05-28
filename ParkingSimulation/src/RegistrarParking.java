public class RegistrarParking {
    private static int count = 0;
    private final int carId;

    public RegistrarParking() {
        this.carId = ++count;
    }

    public int getCarId() {
        return carId;
    }
}
