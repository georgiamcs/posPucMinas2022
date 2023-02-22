const mongoose = require("mongoose");

const user = "georgiam";
const pass = "Mongodb123";
const serverName = "cluster0.ffq2awf.mongodb.net";
const database = "vacine";

module.exports = {
  init: () => {
    mongoose.set("strictQuery", "throw");
    mongoose
      .connect(
        `mongodb+srv://${user}:${pass}@${serverName}/${database}?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then((res) => console.error(">> Conexão com BD realizada com sucesso!"))
      .catch((err) => console.error(`## Erro ao conectar ao BD: ${err}`));
  },
};
