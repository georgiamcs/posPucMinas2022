const app = require("./app");
const db = require("./models/mongoosedb");

db.init();

const port = process.env.PORT || 3005;
app.listen(port, function () {
  console.log(`>> API disponível na porta ${port}`);
});
