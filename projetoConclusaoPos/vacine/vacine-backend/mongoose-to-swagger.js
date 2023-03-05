const mongoose = require("mongoose");
const m2s = require("mongoose-to-swagger");
const UsuarioModel = require("../src/models/usuario.model");
const swaggerSchema = m2s(UsuarioModel);
console.log(swaggerSchema);
