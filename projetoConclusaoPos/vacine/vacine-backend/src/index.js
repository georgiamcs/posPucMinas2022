const app = require("./app");
const setup = require("./setup/setup");
const router = require("./setup/router");
const bd = require("./setup/bd");
const myenvironment = require("./setup/environment");

setup.init(app);
router.init(app);
bd.init();

const port = process.env.PORT || myenvironment.PORTA_API;
app.listen(port, function () {
  console.log(`>> API disponível na porta ${port}`);
});
