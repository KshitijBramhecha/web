var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = /** @class */ (function () {
    function Person(name, age, address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    Person.prototype.display = function () {
        console.log("Name: ".concat(this.name));
        console.log("Age: ".concat(this.age));
        console.log("Address: ".concat(this.address));
    };
    return Person;
}());
var Employee = /** @class */ (function (_super) {
    __extends(Employee, _super);
    function Employee(name, age, address, employeeId) {
        var _this = _super.call(this, name, age, address) || this;
        _this.employeeId = employeeId;
        return _this;
    }
    Employee.prototype.displayEmployee = function () {
        console.log("Employee ID: ".concat(this.employeeId));
        console.log("Name: ".concat(this.name)); // public accessible
        // console.log(`Age: ${this.age}`);      // Error: private not accessible
        console.log("Address: ".concat(this.address)); // protected accessible
    };
    return Employee;
}(Person));
var person = new Person("Alice", 30, "123 Main St");
person.display();
var employee = new Employee("Bob", 40, "456 Elm St", 101);
employee.displayEmployee();
