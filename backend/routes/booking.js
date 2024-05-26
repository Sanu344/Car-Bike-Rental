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
          wheels: body.wheels,
          vehicle: body.vehicle,
          $or: [{ minDate: { $lte: end }, maxDate: { $gte: start } }],
        });

        if (overlappingBooking) {
          return res.status(400).send({
            message: "The vehicle is not available for the selected dates",
          });
        }

        const isBikeAvailable = await Bike.findOne({ vehicle: body.vehicle });
        if (!isBikeAvailable)
          return res.send({ message: "sorry this Bike is not available" });

        const bookVehicles = new Booking({
          wheels: body.wheels,
          vehicle: body.vehicle,
          minDate: body.minDate,
          maxDate: body.maxDate,
          user: body.user,
        });

        const data = await bookVehicles.save();

        console.log("bike booked");
        res.send({ message: "vehicle " + data.vehicle + " booked " });
        break;

      case "4":
        const star = body.minDate;
        const en = body.maxDate;

        const overlappingBookin = await Booking.findOne({
          wheels: body.wheels,
          vehicle: body.vehicle,
          $or: [{ minDate: { $lte: en }, maxDate: { $gte: star } }],
        });

        if (overlappingBookin) {
          return res.status(400).send({
            message: "The vehicle is not available for the selected dates.",
          });
        }

        const isCarAvailable = await Car.findOne({ vehicle: body.vehicle });
        if (!isCarAvailable)
          return res.send({ message: "sorry this car is not available" });

        const bookVehicle = new Booking({
          wheels: body.wheels,
          vehicle: body.vehicle,
          minDate: body.minDate,
          maxDate: body.maxDate,
          user: body.user,
        });

        const data2 = await bookVehicle.save();

        res.send({ message: "vehicle " + data2.vehicle + " booked " });
        break;
    }
  } catch (error) {
    res
      .status(400)
      .send({ message: "4 wheeler could not be booked : " + error.message });
  }
});

module.exports = booking;
