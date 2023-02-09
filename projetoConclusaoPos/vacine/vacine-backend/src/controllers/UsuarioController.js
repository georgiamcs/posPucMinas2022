const UsuarioService = require("../services/UsuarioService");

function createUsuario(req) {
  let usuario = {};
  usuario.nome = req.body.nome;
  usuario.email = req.body.email;
  usuario.cpf = req.body.cnpj;
  usuario.endereco = req.body.endereco;
  usuario.tel_celular = req.body.tel_celular;
  usuario.tel_fixo = req.body.tel_fixo;
  usuario.senha = req.body.senha;
  usuario.perfis = req.body.perfis;
  return usuario;
}

exports.get = async (req, res) => {
  const id = req.params.id;

  try {
    const usuario = await UsuarioService.getUsuarioById(id);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAll = async (req, res) => {
  const usuarios = await UsuarioService.getAllUsuarios();

  try {
    if (!usuarios) {
      return res.status(404).json("Não existem usuários cadastrados!");
    }

    res.json(usuarios);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }  
};

exports.add = async (req, res) => {
  try {
    const usuarioAdicionado = await UsuarioService.addUsuario(req.body);
    res.status(201).json(usuarioAdicionado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  let id = req.params.id;

  try {
    
    usuarioAlterado = createUsuario(req);
    const usuarioAtualizado = await UsuarioService.updateUsuario(
      id,
      usuarioAlterado
    );

    if (usuarioAtualizado.nModified === 0) {
      return res.status(404).json({});
    }

    res.json(usuarioAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResponse = await UsuarioService.deleteUsuario(id);
    res.json(deleteResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
