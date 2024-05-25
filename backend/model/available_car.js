const mongoose = require("mongoose");
const joi = require("joi");

const schema = mongoose.Schema({
  carType: {
    type: String,
    required: true,
  },
  vehicle: { type: String, required: true },
  booked: { type: Boolean, required: true },
});

const Car = new mongoose.model("Cars", schema);

function validateCar(body) {
  const schema = joi.object({
    carType: joi.string().required(),
    vehicle: joi.string().required(),
    booked: joi.boolean().required(),
  });
  return schema.validate(body);
}

module.exports = { Car, validateCar };
