const mongoose = require("mongoose");
const m2s = require("mongoose-to-swagger");
const model = require("./src/models/vacinacao.model");

const swaggerSchema = m2s(model);
console.log(swaggerSchema);
