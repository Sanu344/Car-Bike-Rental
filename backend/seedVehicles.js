const mongoose = require("mongoose");
const config = require("config");
const { Bike, validateBike } = require("./model/available_Bike");
const { Car, validateCar } = require("./model/available_car");

const addBike = [{ bikeType: "sports", vehicle: "Raider" }];

const addCar = [
  { carType: "HatchBack", vehicle: "Hyundai i20" },
  { carType: "suv", vehicle: "Mahindra Scorpio" },
  { carType: "sedan", vehicle: "Honda City" },
  { carType: "sedan", vehicle: "Skoda Slavia" },
];

mongoose.connect(config.get("MONGOURL")).then(async () => {
  console.log("connected to data base... ");

  for (let i = 0; i < addBike.length; i++) {
    seedBike(addBike[i]);
  }

  for (let i = 0; i < addCar.length; i++) {
    seedCar(addCar[i]);
  }
});

async function seedBike(bikeDetail) {
  const body = {
    bikeType: bikeDetail.bikeType,
    vehicle: bikeDetail.vehicle,
    booked: false,
  };
  const { error } = validateBike(body);
  if (error) return console.log(error.message);

  const bike = new Bike({
    bikeType: bikeDetail.bikeType.toUpperCase(),
    vehicle: bikeDetail.vehicle,
    minDate: new Date(),
    booked: false,
  });

  try {
    const data = await bike.save();
    console.log(data);
  } catch (error) {
    console.log(error.messgae);
  }
}

async function seedCar(carDetail) {
  const body = {
    carType: carDetail.carType,
    vehicle: carDetail.vehicle,
    booked: false,
  };
  const { error } = validateCar(body);
  if (error) return console.log(error.message);

  const car = new Car({
    carType: carDetail.carType.toUpperCase(),
    vehicle: carDetail.vehicle,
    minDate: new Date(),
    booked: false,
  });

  try {
    const data = await car.save();
    console.log(data);
  } catch (error) {
    console.log(error.messgae);
  }
}
