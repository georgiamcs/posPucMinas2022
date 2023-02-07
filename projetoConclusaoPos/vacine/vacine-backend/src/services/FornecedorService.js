const FornecedorModel = require("../models/FornecedorModel")

module.exports = class FornecedorService {
  static async getAllFornecedores() {
    try {
      const todosRegistros = await FornecedorModel.find();

      return todosRegistros;
    } catch (error) {
      const msgErro = `Erro ao recuperar todos os fornecedores: ${error.message}`;
      console.error(msgErro);
      throw new Error(msgErro);
    }
  }

  static async getFornecedorById(id) {
    try {
      const registro = await FornecedorModel.findById(id);

      return registro;
    } catch (error) {
      const msgErro = `Fornecedor com Id ${id} não encontrado ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async addFornecedor(pNovoRegistro) {
    try {
      const novoRegistro = {
        nome: pNovoRegistro.nome,
        email: pNovoRegistro.email,
        cnpj: pNovoRegistro.cnpj,
        endereco: pNovoRegistro.endereco,
        tel_celular: pNovoRegistro.tel_celular,
        tel_fixo: pNovoRegistro.tel_fixo,
      };
      const response = await new FornecedorModel(novoRegistro).save();
      return response;
    } catch (error) {
      const msgErro = `Erro ao adicionar nova vacina ${pNovoRegistro.nome}: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async updateFornecedor(id, pRegistroAlterado) {
    try {
      const updateResponse = await FornecedorModel.updateOne(
        { _id: id },
        {
          nome: pRegistroAlterado.nome,
          email: pRegistroAlterado.email,
          cnpj: pRegistroAlterado.cnpj,
          endereco: pRegistroAlterado.endereco,
          tel_celular: pRegistroAlterado.tel_celular,
          tel_fixo: pRegistroAlterado.tel_fixo,
          dt_alteracao: Date.now(),
        }
      );

      return updateResponse;
    } catch (error) {
      const msgErro = `Fornecedor com Id ${id} não pode ser atualizado: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async deleteFornecedor(id) {
    try {
      const deletedResponse = await FornecedorModel.findOneAndDelete({
        _id: id,
      });

      return deletedResponse;
    } catch (error) {
      const msgErro = `Fornecedor com Id ${id} não pode ser excluído: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }
};