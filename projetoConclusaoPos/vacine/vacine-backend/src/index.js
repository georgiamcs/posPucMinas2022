const app = require("./app");
const setup = require("./setup/setup");
const router = require("./setup/router");
const bd = require("./setup/bd");
const myenvironment = require("./setup/environment");

setup.init(app);
bd.init();
router.init(app);

const port = process.env.PORT || myenvironment.PORTA_API;
app.listen(port, function () {
  console.log(`>> API disponível na porta ${port}`);
});
