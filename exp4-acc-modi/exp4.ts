class Person {
    public name: string;       // public can be accessed anywhere
    private age: number;       // private can only be accessed within the class
    protected address: string; // protected can be accessed within the class and subclasses

    constructor(name: string, age: number, address: string) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    public display(): void {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Address: ${this.address}`);
    }
}

class Employee extends Person {
    private employeeId: number;

    constructor(name: string, age: number, address: string, employeeId: number) {
        super(name, age, address);
        this.employeeId = employeeId;
    }

    public displayEmployee(): void {
        console.log(`Employee ID: ${this.employeeId}`);
        console.log(`Name: ${this.name}`);       // public accessible
        // console.log(`Age: ${this.age}`);      // Error: private not accessible
        console.log(`Address: ${this.address}`); // protected accessible
    }
}

const person = new Person("Alice", 30, "123 Main St");
person.display();

const employee = new Employee("Bob", 40, "456 Elm St", 101);
employee.displayEmployee();
