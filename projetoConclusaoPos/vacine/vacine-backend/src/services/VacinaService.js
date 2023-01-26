const vacinaModel = require("../models/VacinaModel")

module.exports = class VacinaService {
  static async getAllVacinas() {
    try {
      const todasVacinas = await vacinaModel.find();
      // ver possibilidade de criar interface para retornar tipo de dado diferente do retornado pelo BD
      return todasVacinas;
    } catch (error) {
      const msgErro = `Erro ao recuperar todas as vacinas: ${error.message}`;
      console.error(msgErro);
      throw new Error(msgErro);
    }
  }

  static async getVacinabyId(idVacina) {
    try {
      const vacina = await vacinaModel.findById(idVacina);

      return vacina;
    } catch (error) {
      const msgErro = `Vacina com Id ${idVacina} não encontrada ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async addVacina(pNovaVacina) {
    try {
      const novaVacina = {
        tx_nome: pNovaVacina.tx_nome,
        tx_protecao_contra: pNovaVacina.tx_protecao_contra,
        tx_composicao: pNovaVacina.tx_composicao,
        in_idade_recomendada: pNovaVacina.in_idade_recomendada,
        tp_idade_recomendada: pNovaVacina.tp_idade_recomendada,
        nr_idade_recomendada: pNovaVacina.nr_idade_recomendada,
      };
      const response = await new vacinaModel(novaVacina).save();
      return response;
    } catch (error) {
      const msgErro = `Erro ao adicionar nova vacina ${pNovaVacina.tx_nome}: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async updateVacina(id, pVacina) {
    try {
      const updateResponse = await vacinaModel.updateOne(
        { _id: id },
        {
          tx_nome: pVacina.tx_nome,
          tx_protecao_contra: pVacina.tx_protecao_contra,
          tx_composicao: pVacina.tx_composicao,
          in_idade_recomendada: pVacina.in_idade_recomendada,
          tp_idade_recomendada: pVacina.tp_idade_recomendada,
          nr_idade_recomendada: pVacina.nr_idade_recomendada,
          dt_alteracao: Date.now(),
        }
      );

      return updateResponse;
    } catch (error) {
      const msgErro = `Vacina com Id ${id} não pode ser atualizada: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async deleteVacina(id) {
    try {
      const deletedResponse = await vacinaModel.findOneAndDelete(
        { _id: id }
      );

      return deletedResponse;
    } catch (error) {
      const msgErro = `Vacina com Id ${id} não pode ser excluída: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }
};