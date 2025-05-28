import java.util.LinkedList;
import java.util.Queue;

public class ParkingPool {
    private final Queue<RegistrarParking> parkingQueue = new LinkedList<>();

    public synchronized void addCar(RegistrarParking car) {
        parkingQueue.add(car);
        System.out.println("Car " + car.getCarId() + " arrived and waiting for parking.");
        notify(); // Wake up a waiting ParkingAgent thread
    }

    public synchronized RegistrarParking getCar() throws InterruptedException {
        while (parkingQueue.isEmpty()) {
            wait(); // Wait until a car is available
        }
        return parkingQueue.poll();
    }
}
