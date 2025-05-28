import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        ParkingPool pool = new ParkingPool();

        // Create 3 parking agents
        new ParkingAgent("ParkingAgent-1", pool).start();
        new ParkingAgent("ParkingAgent-2", pool).start();
        new ParkingAgent("ParkingAgent-3", pool).start();

        Scanner scanner = new Scanner(System.in);
        int carCount = 0;

        // Simulate car arrival
        while (carCount < 10) {
            System.out.println("Press Enter to register a car for parking (or -1 to exit):");
            String input = scanner.nextLine();
            if (input.equals("-1")) break;

            RegistrarParking car = new RegistrarParking();
            pool.addCar(car);
            carCount++;
        }

        scanner.close();
    }
}
