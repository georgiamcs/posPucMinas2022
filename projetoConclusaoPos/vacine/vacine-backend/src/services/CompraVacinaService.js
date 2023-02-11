// TODO: verificar se registro com mesmo nome ja existe antes de incluir
const CompraVacinaModel = require("../models/CompraVacinaModel");

module.exports = class CompraVacinaService {
  static async getAllCompraVacinas() {
    try {
      const todosRegistros = await CompraVacinaModel.find();

      return todosRegistros;
    } catch (error) {
      const msgErro = `Erro ao recuperar todas as compras de vacinas: ${error.message}`;
      console.error(msgErro);
      throw new Error(msgErro);
    }
  }

  static async getCompraVacinaById(id) {
    try {
      const registro = await CompraVacinaModel.findById(id);

      return registro;
    } catch (error) {
      const msgErro = `CompraVacina com Id ${id} não encontrado ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async addCompraVacina(pNovoRegistro) {
    try {
      const novoRegistro = {
        id_fornecedor: pNovoRegistro.id_fornecedor,
        nome_fornecedor: pNovoRegistro.nome_fornecedor,
        cnpj_fornecedor: pNovoRegistro.cnpj_fornecedor,
        nota_fiscal: pNovoRegistro.nota_fiscal,
        data_compra: pNovoRegistro.data_compra,
        itens_compra: pNovoRegistro.itens_compra,
      };
      const response = await new CompraVacinaModel(novoRegistro).save();
      return response;
    } catch (error) {
      const msgErro = `Erro ao adicionar nova compra de vacina ${pNovoRegistro.nome}: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async updateCompraVacina(id, pRegistroAlterado) {
    try {
      const updateResponse = await CompraVacinaModel.updateOne(
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
      const msgErro = `CompraVacina com Id ${id} não pode ser atualizado: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async deleteCompraVacina(id) {
    try {
      const deletedResponse = await CompraVacinaModel.findOneAndDelete({
        _id: id,
      });

      return deletedResponse;
    } catch (error) {
      const msgErro = `CompraVacina com Id ${id} não pode ser excluído: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }
};
