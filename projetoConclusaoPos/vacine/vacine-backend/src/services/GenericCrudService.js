// TODO: verificar se registro com mesmo nome ja existe antes de incluir
class GenericCrudService {
  static async getAll(objectModel) {
    try {
      const todosRegistros = await objectModel.find();

      return todosRegistros;
    } catch (error) {
      const msgErro = `Erro ao recuperar todos os registros: ${error.message}`;
      console.error(msgErro);
      throw new Error(msgErro);
    }
  }

  static async getById(objectModel, id) {
    try {
      const registro = await objectModel.findById(id);

      return registro;
    } catch (error) {
      const msgErro = `Registro com Id ${id} não encontrado ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async add(objectModel, fnCriarObjEntidade, pNovoRegistro) {
    try {
      const novoRegistro = fnCriarObjEntidade(pNovoRegistro);
      const response = await new objectModel(novoRegistro).save();
      return response;
    } catch (error) {
      const msgErro = `Erro ao adicionar novo registro ${pNovoRegistro.nome}: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async update(objectModel, id, pRegistroAlterado) {
    try {
      const updateResponse = await objectModel.updateOne(
        { _id: id },
        {
          ...pRegistroAlterado,
          dt_alteracao: Date.now(),
        }
      );

      return updateResponse;
    } catch (error) {
      const msgErro = `Registro com Id ${id} não pode ser atualizado: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async delete(objectModel, id) {
    try {
      const deletedResponse = await objectModel.findOneAndDelete({
        _id: id,
      });

      return deletedResponse;
    } catch (error) {
      const msgErro = `Registro com Id ${id} não pode ser excluído: ${error.message}`;
      console.log(msgErro);
      throw new Error(msgErro);
    }
  }

  static async findOne(objectModel, query) {
    return await objectModel.findOne(query);
  }
}

module.exports = GenericCrudService;
