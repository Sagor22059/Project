public class ParkingAgent extends Thread {
    private final ParkingPool parkingPool;
    private final String agentName;

    public ParkingAgent(String name, ParkingPool pool) {
        this.agentName = name;
        this.parkingPool = pool;
    }

    public void run() {
        while (true) {
            try {
                RegistrarParking car = parkingPool.getCar();
                System.out.println(agentName + " is parking Car " + car.getCarId());
                Thread.sleep(2000); // simulate time to park
                System.out.println(agentName + " has parked Car " + car.getCarId());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
