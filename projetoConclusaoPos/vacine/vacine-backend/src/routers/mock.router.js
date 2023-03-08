const jsonServer = require("json-server");
const path = require("path");

const routerJsonServer = jsonServer.router(
  path.join(__dirname, "../mock/db.json")
);

const idFieldName = "_id";
// Middleware para modificar o nome do campo ID
routerJsonServer.render = (req, res) => {
  if (!req.headers.authorization && !req.path.includes("/autenticacao")) {
    return res.status(401).json({});
  } else {
    if (Array.isArray(res.locals.data)) {
      res.jsonp(
        res.locals.data.map((item) => {
          const { id, ...dataWithoutId } = item;
          return { [idFieldName]: id, ...dataWithoutId };
        })
      );
    } else {
      const { id, ...dataWithoutId } = res.locals.data;
      res.jsonp({ [idFieldName]: id, ...dataWithoutId });
    }
  }
};

module.exports = routerJsonServer;
