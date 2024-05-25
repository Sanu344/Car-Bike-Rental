const mongoose = require("mongoose");
const joi = require("joi");

const schema = mongoose.Schema({
  wheels: {
    type: String,
    required: true,
  },
  vehicle: { type: String, required: true },
  minDate: { type: string, required: true },
  maxDate: { type: string, required: true },
});

const Car = new mongoose.model("Cars", schema);

function validateCar(body) {
  const schema = joi.object({
    carType: joi.string().required(),
    vehicle: joi.string().required(),
    booked: joi.boolean().required(),
    minDate: joi.string().required(),
    maxDate: joi.string().required(),
  });
  return schema.validate(body);
}

module.exports = { Car, validateCar };
