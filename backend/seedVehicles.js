const mongoose = require("mongoose");
const config = require("config");
const { Bike, validateBike } = require("./model/available_Bike");

const addBike = { bikeType: "sports", vehicle: "Raider" };

mongoose.connect(config.get("MONGOURL")).then(() => {
  console.log("connected to data base... ");
  seedBike(addBike);
});

async function seedBike(bikeDetail) {
  const body = {
    bikeType: bikeDetail.bikeType,
    vehicle: bikeDetail.vehicle,
    booked: false,
  };
  const { error } = validateBike(body);
  if (error) console.log(error.message);

  const bike = new Bike({
    bikeType: bikeDetail.bikeType,
    vehicle: bikeDetail.vehicle,
    booked: false,
  });

  try {
    const data = await bike.save();
    console.log(data);
  } catch (error) {
    console.log(error.messgae);
  }
}

function seedCar(type, vehicle) {}
