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
// Single Inheritance Example
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.makeSound = function () {
        return "Some generic sound";
    };
    return Animal;
}());
// Dog inherits from Animal (Single Inheritance)
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name, breed) {
        var _this = _super.call(this, name) || this;
        _this.breed = breed;
        return _this;
    }
    Dog.prototype.makeSound = function () {
        return "Woof! Woof!";
    };
    Dog.prototype.fetch = function () {
        return "".concat(this.name, " is fetching the ball!");
    };
    return Dog;
}(Animal));
// Duck implements both Swimmer and Flyer interfaces (Multiple Inheritance)
var Duck = /** @class */ (function (_super) {
    __extends(Duck, _super);
    function Duck(name) {
        return _super.call(this, name) || this;
    }
    Duck.prototype.makeSound = function () {
        return "Quack! Quack!";
    };
    Duck.prototype.swim = function () {
        return "".concat(this.name, " is swimming in the pond");
    };
    Duck.prototype.fly = function () {
        return "".concat(this.name, " is flying high in the sky");
    };
    return Duck;
}(Animal));
// Multilevel Inheritance Example
var WorkingDog = /** @class */ (function (_super) {
    __extends(WorkingDog, _super);
    function WorkingDog(name, breed, job) {
        var _this = _super.call(this, name, breed) || this;
        _this.job = job;
        return _this;
    }
    WorkingDog.prototype.performJob = function () {
        return "".concat(this.name, " is working as a ").concat(this.job);
    };
    return WorkingDog;
}(Dog));
// Create instances
var genericAnimal = new Animal("Generic Animal");
var rex = new Dog("Rex", "German Shepherd");
var daffy = new Duck("Daffy");
var max = new WorkingDog("Max", "Border Collie", "sheep herder");
// Function to display results in the HTML
function displayResults() {
    var results = [
        "<h2>Single Inheritance</h2>",
        "<p>Animal: ".concat(genericAnimal.name, " says \"").concat(genericAnimal.makeSound(), "\"</p>"),
        "<p>Dog: ".concat(rex.name, " (").concat(rex.breed, ") says \"").concat(rex.makeSound(), "\" and ").concat(rex.fetch(), "</p>"),
        "<h2>Multiple Inheritance (using interfaces)</h2>",
        "<p>Duck: ".concat(daffy.name, " says \"").concat(daffy.makeSound(), "\"</p>"),
        "<p>".concat(daffy.swim(), "</p>"),
        "<p>".concat(daffy.fly(), "</p>"),
        "<h2>Multilevel Inheritance</h2>",
        "<p>Working Dog: ".concat(max.name, " (").concat(max.breed, ") says \"").concat(max.makeSound(), "\"</p>"),
        "<p>".concat(max.fetch(), "</p>"),
        "<p>".concat(max.performJob(), "</p>")
    ];
    document.getElementById('results').innerHTML = results.join('');
}
// Call the function when the window loads
window.onload = displayResults;
