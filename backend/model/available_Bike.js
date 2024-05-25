const mongoose = require("mongoose");
const joi = require("joi");

const schema = mongoose.Schema({
  bikeType: {
    type: String,
    required: true,
  },
  vehicle: { type: String, required: true },
  booked: { type: Boolean, required: true },
  minDate: { type: String },
  maxDate: { type: String },
});

const Bike = new mongoose.model("Bikes", schema);

function validateBike(body) {
  const schema = joi.object({
    bikeType: joi.string().required(),
    vehicle: joi.string().required(),
    booked: joi.boolean().required(),
    minDate: joi.string(),
    maxDate: joi.string(),
  });
  return schema.validate(body);
}

module.exports = { Bike, validateBike };
