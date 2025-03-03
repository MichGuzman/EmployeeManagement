// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import {type} from "node:os";

//process.stdin.setMaxListeners(1000);
// define the Cli class
class Cli {
  // DONE: update the vehicles property to accept Truck and Motorbike objects as well
  // DONE: You will need to use the Union operator to define additional types for the array
  // DONE: See the AbleToTow interface for an example of how to use the Union operator
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  // DONE: Update the constructor to accept Truck and Motorbike objects as well
  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  // static method to generate a vin
  static generateVin(): string {
    // return a random string
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  // method to choose a vehicle from existing vehicles
  //Replaced then() with async await for a clearer and cleaner workflow
   async chooseVehicle(): Promise<void> {
    //Remove all listeners before an inquirer call to avoid memory leak warning
     //process.stdin.removeAllListeners();
     const ans = await inquirer.prompt([{
      type: 'list',
      name: 'selectedVehicleVin',
      message: 'Select a vehicle to perform an action on',
      choices: this.vehicles.map((vehicle) => {
        return {
          name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
          value: vehicle.vin,
        };
      }),
    },]);
    this.selectedVehicleVin = ans.selectedVehicleVin;
    await this.performActions();
  }

  // method to create a vehicle
  async createVehicle(): Promise<void> {
    //Remove all listeners before an inquirer call to avoid memory leak warning
    //process.stdin.removeAllListeners();
    const ans = await inquirer.prompt([{
      type: 'list',
      name: 'vehicleType',
      message: 'Select a vehicle type',
      // DONE: Update the choices array to include Truck and Motorbike
      choices: ['Car', 'Truck', 'Motorbike'],
    },]);
    if (ans.vehicleType === 'Car') {
      // create a car
      await this.createCar();
    } else if (ans.vehicleType === 'Truck') {
      await this.createTruck();
    } else if (ans.vehicleType === 'Motorbike') {
      await this.createMotorbike();
    }
    // DONE: add statements to create a truck or motorbike if the user selects the respective vehicle type
  }

  // method to create a car
  async createCar(): Promise<void> {
    //Remove all listeners before an inquirer call to avoid memory leak warning
    //process.stdin.removeAllListeners();
    const ans = await inquirer.prompt([{
      type: 'input',
      name: 'color',
      message: 'Enter Color',
    },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },])
    const car = new Car(
        // DONE: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
        Cli.generateVin(),
        ans.color,
        ans.make,
        ans.model,
        parseInt(ans.year),
        parseInt(ans.weight),
        parseInt(ans.topSpeed),
        []
    );
    // push the car to the vehicles array
    this.vehicles.push(car);
    // set the selectedVehicleVin to the vin of the car
    this.selectedVehicleVin = car.vin;
    // perform actions on the car
    await this.performActions();
  }

  // method to create a truck
  async createTruck(): Promise<void> {
    //Remove all listeners before an inquirer call to avoid memory leak warning
    //process.stdin.removeAllListeners();
    const ans = await inquirer.prompt([{
      type: 'input',
      name: 'color',
      message: 'Enter Color',
    },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },
      {
        type: 'input',
        name: 'towingCapacity',
        message: 'Enter Towing Capacity',
      },])

    const truck = new Truck(
        // DONE: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
        Cli.generateVin(),
        ans.color,
        ans.make,
        ans.model,
        parseInt(ans.year),
        parseInt(ans.weight),
        parseInt(ans.topSpeed),
        [],
        parseInt(ans.towingCapacity),
    );
    // push the car to the vehicles array
    this.vehicles.push(truck);
    // set the selectedVehicleVin to the vin of the truck
    this.selectedVehicleVin = truck.vin;
    // perform actions on the car
    await this.performActions();

    // DONE: Use the answers object to pass the required properties to the Truck constructor
    // DONE: push the truck to the vehicles array
    // DONE: set the selectedVehicleVin to the vin of the truck
    // DONE: perform actions on the truck
  }

  // method to create a motorbike
  async createMotorbike(): Promise<void> {
    //Remove all listeners before an inquirer call to avoid memory leak warning
    //process.stdin.removeAllListeners();

    const ans = await inquirer.prompt([{
      type: 'input',
      name: 'color',
      message: 'Enter Color',
    },
      {
        type: 'input',
        name: 'make',
        message: 'Enter Make',
      },
      {
        type: 'input',
        name: 'model',
        message: 'Enter Model',
      },
      {
        type: 'input',
        name: 'year',
        message: 'Enter Year',
      },
      {
        type: 'input',
        name: 'weight',
        message: 'Enter Weight',
      },
      {
        type: 'input',
        name: 'topSpeed',
        message: 'Enter Top Speed',
      },
      {
        type: 'input',
        name: 'frontWheelDiameter',
        message: 'Enter Front Wheel Diameter',
      },
      {
        type: 'input',
        name: 'frontWheelBrand',
        message: 'Enter Front Wheel Brand',
      },
      {
        type: 'input',
        name: 'rearWheelDiameter',
        message: 'Enter Rear Wheel Diameter',
      },
      {
        type: 'input',
        name: 'rearWheelBrand',
        message: 'Enter Rear Wheel Brand',
      },])
    const motorbike = new Motorbike(
        // DONE: The generateVin method is static and should be called using the class name Cli, make sure to use Cli.generateVin() for creating a truck and motorbike as well!
        Cli.generateVin(),
        ans.color,
        ans.make,
        ans.model,
        parseInt(ans.year),
        parseInt(ans.weight),
        parseInt(ans.topSpeed),
        []
    );
    // push the car to the vehicles array
    this.vehicles.push(motorbike);
    // set the selectedVehicleVin to the vin of the truck
    this.selectedVehicleVin = motorbike.vin;
    // perform actions on the car
    await this.performActions();
  }

  // method to find a vehicle to tow
  // DONE: add a parameter to accept a truck object
  async findVehicleToTow(_currentVehicle : Truck | Car | Motorbike): Promise<void> {
    //Remove all listeners before an inquirer call to avoid memory leak warning
    //process.stdin.removeAllListeners();
    const ans = await inquirer.prompt([{
      type: 'list',
      name: 'vehicleToTow',
      message: 'Select a vehicle to tow',
      choices: this.vehicles.map((vehicle) => {
        return {
          name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
          value: vehicle,
        };
      }),
    },])

    if (ans.vehicleToTow === _currentVehicle) {
      console.log(`Current Vehicle is unable to tow itself...`);
      return this.findVehicleToTow(_currentVehicle);
    }
    if (_currentVehicle instanceof Truck) {
      return _currentVehicle.tow(ans.vehicleToTow);
    }
    // DONE: check if the selected vehicle is the truck
    // DONE: if it is, log that the truck cannot tow itself then perform actions on the truck to allow the user to select another action
    // DONE: if it is not, tow the selected vehicle then perform actions on the truck to allow the user to select another action
  }

  // method to perform actions on a vehicle
  async performActions(): Promise<void> {
    //Remove all listeners before an inquirer call to avoid memory leak warning
    //process.stdin.removeAllListeners();
    const currentVehicleType = this.vehicles.find((vehicle : Car | Truck | Motorbike) =>
      this.selectedVehicleVin === vehicle.vin);
    const specialAction = (currentVehicleType : Car | Truck | Motorbike | undefined) => {
      if (currentVehicleType instanceof Truck) {
        return 'Tow Vehicle';
      } else if (currentVehicleType instanceof Motorbike) {
        return 'Do Wheelie';
      }
       return 'No special action';
    };

    const ans = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'Select an action',
      // DONE: add options to tow and wheelie
      choices: [
        'Print details',
        'Start vehicle',
        'Accelerate 5 MPH',
        'Decelerate 5 MPH',
        'Stop vehicle',
        'Turn right',
        'Turn left',
        'Reverse',
        specialAction(currentVehicleType),
        'Select or create another vehicle',
        'Exit',
      ],
    },])

    // perform the selected action
    if (ans.action === 'Print details') {
      // find the selected vehicle and print its details
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          this.vehicles[i].printDetails();
        }
      }
    } else if (ans.action === 'Start vehicle') {
      // find the selected vehicle and start it
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          this.vehicles[i].start();
        }
      }
    } else if (ans.action === 'Accelerate 5 MPH') {
      // find the selected vehicle and accelerate it by 5 MPH
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          this.vehicles[i].accelerate(5);
        }
      }
    } else if (ans.action === 'Decelerate 5 MPH') {
      // find the selected vehicle and decelerate it by 5 MPH
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          this.vehicles[i].decelerate(5);
        }
      }
    } else if (ans.action === 'Stop vehicle') {
      // find the selected vehicle and stop it
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          this.vehicles[i].stop();
        }
      }
    } else if (ans.action === 'Turn right') {
      // find the selected vehicle and turn it right
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          this.vehicles[i].turn('right');
        }
      }
    } else if (ans.action === 'Turn left') {
      // find the selected vehicle and turn it left
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          this.vehicles[i].turn('left');
        }
      }
    } else if (ans.action === 'Reverse') {
      // find the selected vehicle and reverse it
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          this.vehicles[i].reverse();
        }
      }
    } else if (ans.action === 'Tow Vehicle') {
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          await this.findVehicleToTow(this.vehicles[i]);
        }
      }
    } else if (ans.action === 'Do Wheelie') {
      for (let i = 0; i < this.vehicles.length; i++) {
        if (this.vehicles[i].vin === this.selectedVehicleVin) {
          if (this.vehicles[i] instanceof Motorbike) {
            // @ts-ignore
            this.vehicles[i].wheelie();
          }
        }
      }
    }
    // DONE: add statements to perform the tow action only if the selected vehicle is a truck. Call the findVehicleToTow method to find a vehicle to tow and pass the selected truck as an argument. After calling the findVehicleToTow method, you will need to return to avoid instantly calling the performActions method again since findVehicleToTow is asynchronous.
    // DONE: add statements to perform the wheelie action only if the selected vehicle is a motorbike
    else if (ans.action === 'Select or create another vehicle' || ans.action === 'No special action') {
      // start the cli to return to the initial prompt if the user wants to select or create another vehicle
      await this.startCli();
      return;
    } else {
      // exit the cli if the user selects exit
      this.exit = true;
    }
    if (!this.exit) {
      // if the user does not want to exit, perform actions on the selected vehicle
      await this.performActions();
    }
  }

  // method to start the cli
  async startCli(): Promise<void> {
    //Remove all listeners before an inquirer call to avoid memory leak warning
    //process.stdin.removeAllListeners();
    const ans = await inquirer.prompt([{
      type: 'list',
      name: 'CreateOrSelect',
      message:
          'Would you like to create a new vehicle or perform an action on an existing vehicle?',
      choices: ['Create a new vehicle', 'Select an existing vehicle'],
    },])
    if (ans.CreateOrSelect === 'Create a new vehicle') {
      await this.createVehicle();
    } else {
      await this.chooseVehicle();
    }
  }
}

// export the Cli class
export default Cli;