// Importing Vehicle and Wheel classes
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

// TODO: The Motorbike class should extend the Vehicle class
// TODO: Declare properties of the Motorbike class
class Motorbike extends Vehicle {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];


  // TODO: Create a constructor that accepts the properties of the Motorbike class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[] = []  // Notice 'Wheel[]' not 'wheels[]'
  ) {
    // TODO: The constructor should call the constructor of the parent class, Vehicle
    super();

    // TODO: The constructor should initialize the properties of the Motorbike class
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;

    console.log("Wheels passed to constructor:", wheels);

    // TODO: The constructor should check if the wheels array has 2 elements and create 2 new default Wheel objects if it does not
    if (wheels.length !== 2) {
      this.wheels = [new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }

  // TODO: Implement the wheelie method
    // TODO: The method should log the message "Motorbike [make] [model] is doing a wheelie!"
    wheelie() {
      console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
    }  

  // TODO: Override the printDetails method from the Vehicle class
    // TODO: The method should call the printDetails method of the parent class
    override printDetails() {
      super.printDetails();
      console.log(`VIN: ${this.vin}`);
      console.log(`Make: ${this.make}`);
      console.log(`Model: ${this.model}`);
      console.log(`Year: ${this.year}`);
      console.log(`Weight: ${this.weight} kg`);
      console.log(`Top Speed: ${this.topSpeed} km/h`);
      console.log(`Color: ${this.color}`);
      console.log(`Wheels: ${this.wheels.length} wheels`);
    }
  }  
    // TODO: The method should log the details of the Motorbike
    // TODO: The details should include the VIN, make, model, year, weight, top speed, color, and wheels
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Motorbike;
}

// Export the Motorbike class as the default export
export default Motorbike;
