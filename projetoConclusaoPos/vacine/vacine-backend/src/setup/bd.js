const banco = require("./mongoosedb");

module.exports = {
  init: () => {
    banco.init();
  },
};