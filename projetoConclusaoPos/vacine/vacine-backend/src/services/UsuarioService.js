// TODO: verificar se registro com mesmo nome ja existe antes de incluir
const UsuarioModel = require("../models/UsuarioModel");

module.exports = class UsuarioService {
  static async getAllUsuarios() {
    try {
      const todosRegistros = await UsuarioModel.find();

      return todosRegistros;
    } catch (error) {
      const msgErro = `Erro ao recuperar todos os Usuários: ${error.message}`;
      console.error(msgErro);
      throw new Error(msgErro);
    }
  }

  static async getUsuarioById(id) {
    try {
      const registro = await UsuarioModel.findById(id);

      return registro;
    } catch (error) {
      const msgErro = `Usuario com Id ${id} não encontrado ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async addUsuario(pNovoRegistro) {
    try {
      const novoRegistro = {
        tipo: pNovoRegistro.tipo,
        nome: pNovoRegistro.nome,
        email: pNovoRegistro.email,
        cpf: pNovoRegistro.cpf,
        endereco: pNovoRegistro.endereco,
        tel_celular: pNovoRegistro.tel_celular,
        tel_fixo: pNovoRegistro.tel_fixo,
        senha: pNovoRegistro.senha,
        perfis: pNovoRegistro.perfis,
      };
      const response = await new UsuarioModel(novoRegistro).save();
      return response;
    } catch (error) {
      const msgErro = `Erro ao adicionar novo usuário ${pNovoRegistro.nome}: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async updateUsuario(id, pRegistroAlterado) {
    try {
      const updateResponse = await UsuarioModel.updateOne(
        { _id: id },
        {
          tipo: pRegistroAlterado.tipo,
          nome: pRegistroAlterado.nome,
          email: pRegistroAlterado.email,
          cpf: pRegistroAlterado.cpf,
          endereco: pRegistroAlterado.endereco,
          tel_celular: pRegistroAlterado.tel_celular,
          tel_fixo: pRegistroAlterado.tel_fixo,
          senha: pRegistroAlterado.senha,
          perfis: pRegistroAlterado.perfis,
          dt_alteracao: Date.now(),
        }
      );

      return updateResponse;
    } catch (error) {
      const msgErro = `Usuário com Id ${id} não pode ser atualizado: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async deleteUsuario(id) {
    try {
      const deletedResponse = await UsuarioModel.findOneAndDelete({
        _id: id,
      });

      return deletedResponse;
    } catch (error) {
      const msgErro = `Usuário com Id ${id} não pode ser excluído: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }
};
