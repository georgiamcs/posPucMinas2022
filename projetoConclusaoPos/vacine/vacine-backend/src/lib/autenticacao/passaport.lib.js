const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../../setup/config");
const UsuarioModel = require("../../models/usuario.model");

exports.applyPassportStrategy = (passport) => {
  const options = {};
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  options.secretOrKey = config.PASSPORT.SECRET;
  passport.use(
    new Strategy(options, (payload, done) => {

      UsuarioModel.findOne({ email: payload.usuario.email }, (err, user) => {
        if (err) return done(err, false);
        if (user) {
          return done(null, {
            _id: user["_id"],
            email: user.email,
            nome: user.nome,
            cpf: user.cpf,
            perfil_acesso: user.perfil_acesso,
          });
        }
        return done(null, false);
      });
    })
  );
};
