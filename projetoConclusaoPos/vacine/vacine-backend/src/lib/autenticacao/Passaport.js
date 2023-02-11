const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../../setup/config");
const UsuarioModel = require("../../models/UsuarioModel");

exports.applyPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = config.PASSPORT.SECRET;
  passport.use(
    new Strategy(options, (payload, done) => {

      UsuarioModel.findOne({ email: payload.email }, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          return done(null, {
            _id: user["_id"],
            email: user.email,
            nome: user.nome,
            perfis: user.perfis,
          });
        }
        return done(null, false);
      });
    })
  );
};
