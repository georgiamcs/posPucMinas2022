const app = require("./src/app");
const setup = require("./src/setup/setup");
const router = require("./src/setup/router");
const bd = require("./src/setup/bd");
const myenvironment = require("./src/setup/environment");

setup.init(app);
bd.init();
router.init(app);

const port = process.env.PORT || myenvironment.PORTA_API;
app.listen(port, function () {
  console.log(`>> API disponível na porta ${port}`);
});
