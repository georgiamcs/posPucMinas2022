const app = require("./app");
const db = require("./setup/mongoosedb");

db.init();

const port = process.env.PORT || 3005;
app.listen(port, function () {
  console.log(`>> API disponível na porta ${port}`);
});
