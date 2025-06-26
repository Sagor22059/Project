import java.util.List;
import java.util.Scanner;

public class ConsoleInput {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ServiceClass serviceClass = new ServiceClass();

        while (true) {
            System.out.println("\n1. Insert Student");
            System.out.println("2. Show All Students");
            System.out.println("3. Update Student Name");
            System.out.println("4. Delete Student");
            System.out.println("5. Exit");
            System.out.print("Choose option: ");

            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    System.out.print("Enter Name: ");
                    String name = scanner.nextLine();

                    if (serviceClass.InsetDB(name)) {
                        System.out.println("Student inserted successfully.");
                    } else {
                        System.out.println("Failed to insert student.");
                    }
                    break;

                case 2:
                    List<Student> students = serviceClass.ReadFromDB();
                    if (students != null && !students.isEmpty()) {
                        System.out.println("Student List:");
                        for (Student s : students) {
                            System.out.println(s.getId() + " " + s.getName());
                        }
                    } else {
                        System.out.println("No students found.");
                    }
                    break;

                case 3:
                    System.out.print("Enter ID to Update: ");
                    int updateId = scanner.nextInt();
                    scanner.nextLine();

                    System.out.print("Enter New Name: ");
                    String newName = scanner.nextLine();
                    serviceClass.UpdateStudent(updateId, newName);
                    System.out.println("Student updated.");
                    break;

                case 4:
                    System.out.print("Enter ID to Delete: ");
                    int deleteId = scanner.nextInt();
                    serviceClass.deleteStudent(deleteId);
                    System.out.println("Student deleted.");
                    break;

                case 5:
                    System.out.println("Exiting...");
                    return;

                default:
                    System.out.println("Invalid choice. Try again.");
            }
        }
    }
}
