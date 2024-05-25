const express = require("express");
const booking = express.Router();
const { Car, validateCar } = require("../model/available_car");
const { Bike, validateBike } = require("../model/available_Bike");
const { validateBooking, Booking } = require("../model/bookings");

booking.post("/", async (req, res) => {
  console.log("api/submit ascessed");

  const body = req.body;

  const { error } = validateBooking(body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    const key = body.wheels;
    switch (key) {
      case "2":
        const start = body.minDate;
        const end = body.maxDate;

        const overlappingBooking = await Booking.findOne({
          vehicle: body.vehicle,
          $or: [{ minDate: { $lte: end }, maxDate: { $gte: start } }],
        });

        if (overlappingBooking) {
          return res
            .status(400)
            .send("The vehicle is already booked for the selected dates.");
        }

        const bookVehicles = new Booking({
          wheels: body.wheels,
          vehicle: body.vehicle,
          minDate: body.minDate,
          maxDate: body.maxDate,
        });

        const data = await bookVehicles.save();

        const obj = await Bike.findOne({
          vehicle: body.vehicle,
        });

        obj.minDate = body.minDate;
        obj.maxDate = body.maxDate;
        obj.booked = true;
        const result = await obj.save();
        console.log("bike data updated");
        res.send({ message: "vehicle " + data.vehicle + " booked " });
        break;

      case "4":
        break;
    }
  } catch (error) {
    res.status(400).send({ message: "could not be booked : " + error.message });
  }
});

module.exports = booking;
