// Single Inheritance Example
class Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    makeSound(): string {
        return "Some generic sound";
    }
}

// Dog inherits from Animal (Single Inheritance)
class Dog extends Animal {
    breed: string;
    
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
    
    makeSound(): string {
        return "Woof! Woof!";
    }
    
    fetch(): string {
        return `${this.name} is fetching the ball!`;
    }
}

// Multiple Inheritance Example (using interfaces)
interface Swimmer {
    swim(): string;
}

interface Flyer {
    fly(): string;
}

// Duck implements both Swimmer and Flyer interfaces (Multiple Inheritance)
class Duck extends Animal implements Swimmer, Flyer {
    constructor(name: string) {
        super(name);
    }
    
    makeSound(): string {
        return "Quack! Quack!";
    }
    
    swim(): string {
        return `${this.name} is swimming in the pond`;
    }
    
    fly(): string {
        return `${this.name} is flying high in the sky`;
    }
}

// Multilevel Inheritance Example
class WorkingDog extends Dog {
    job: string;
    
    constructor(name: string, breed: string, job: string) {
        super(name, breed);
        this.job = job;
    }
    
    performJob(): string {
        return `${this.name} is working as a ${this.job}`;
    }
}

// Create instances
const genericAnimal = new Animal("Generic Animal");
const rex = new Dog("Rex", "German Shepherd");
const daffy = new Duck("Daffy");
const max = new WorkingDog("Max", "Border Collie", "sheep herder");

// Function to display results in the HTML
function displayResults(): void {
    const results = [
        "<h2>Single Inheritance</h2>",
        `<p>Animal: ${genericAnimal.name} says "${genericAnimal.makeSound()}"</p>`,
        `<p>Dog: ${rex.name} (${rex.breed}) says "${rex.makeSound()}" and ${rex.fetch()}</p>`,
        
        "<h2>Multiple Inheritance (using interfaces)</h2>",
        `<p>Duck: ${daffy.name} says "${daffy.makeSound()}"</p>`,
        `<p>${daffy.swim()}</p>`,
        `<p>${daffy.fly()}</p>`,
        
        "<h2>Multilevel Inheritance</h2>",
        `<p>Working Dog: ${max.name} (${max.breed}) says "${max.makeSound()}"</p>`,
        `<p>${max.fetch()}</p>`,
        `<p>${max.performJob()}</p>`
    ];
    
    document.getElementById('results')!.innerHTML = results.join('');
}

// Call the function when the window loads
window.onload = displayResults;