const express = require("express");
const vehicles = express.Router();
const { Car } = require("../model/available_car");
const { Bike } = require("../model/available_Bike");

vehicles.get("/", async (req, res) => {
  console.log("ascessed end point: api/list");
  try {
    const dataCars = await Car.find();
    const arr1 = dataCars.map((e) => e.carType);
    let set_CarTypes = new Set(arr1);
    const carTypes = Array.from(set_CarTypes);
    console.log(carTypes);

    const dataBike = await Bike.find();
    const arr2 = dataBike.map((e) => e.bikeType);
    let set_BikeTypes = new Set(arr2);
    const bikeTypes = Array.from(set_BikeTypes);
    console.log(bikeTypes);

    const vehicleAvailable = [...dataCars, ...dataBike];

    res.send({
      vehicleList: vehicleAvailable,
      carTypesList: carTypes,
      bikeTypeList: bikeTypes,
    });
  } catch (error) {
    res.send({ message: "could not retrive data " + error.message });
  }
});

module.exports = vehicles;
