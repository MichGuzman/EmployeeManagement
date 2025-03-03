# Vehicle Builder

## Description
This project is a console application that allows users to create and manage vehicles. Users can choose between three types of vehicles: **Car**, **Truck**, and **Motorcycle**. The application allows users to enter details about the vehicle and performs different actions depending on the type of vehicle selected. This project uses TypeScript and the Inquirer library to handle user input on the command line.

## Demo Video Link
[Demo Video]([https://drive.google.com/file/d/1vUC-hDzSmEMDs5s7tCepOG-y7ZVBpEB4/view])
*Make sure to replace "VIDEO_URL" with the actual link to your demo video.*

## Requirements
- Node.js
- npm (Node Package Manager)

## Installation
1. Clone this repository to your local machine:
```bash
git clone https://github.com/YOUR_USER/vehicle-builder.git
```

2. Navigate to the project folder:
```bash
cd vehicle-builder
```

3. Install the required dependencies:
```bash
npm install
```

## Usage

1. To run the application, use the following command:
```bash
npm start
```

2. The application will prompt you to choose between a **Car**, **Truck**, or **Motorcycle**. Next, you will need to provide details about the vehicle, such as make, model, year, color, and other attributes specific to the type of vehicle selected.

3. The app will display a summary with all the details entered and allow you to perform further actions if necessary.

## Features

- Create vehicles of type **Car**, **Truck**, or **Motorcycle**.
- The **Truck** and **Motorcycle** vehicles have additional details that the **Car** does not have.
- The **Truck** allows additional actions such as displaying its load capacity.
- The **Motorbike** allows displaying if it is performing a stunt such as a "wheelie."

## Implemented Classes

- **Vehicle**: Base class for all vehicles.
- **Car**: Class that extends `Vehicle` and represents a car.
- **Truck**: Class that extends `Vehicle` and represents a truck, with additional actions.
- **Motorbike**: Class that extends `Vehicle` and represents a motorcycle, with stunts like a wheelie.

## Libraries and Tools

- **Inquirer**: To handle questions and answers on the command line.
- **TypeScript**: To compile and run the code.

## Contributions

If you would like to contribute to this project, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature (`git checkout -b new-feature`).
3. Make changes and commit (`git commit -am 'I added a new feature'`).
4. Push to the branch (`git push origin new-feature`).
5. Create a pull request on GitHub.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.