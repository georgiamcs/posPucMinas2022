class GenericCrudService {
  static async getAll(objectModel) {
    try {
      const todosRegistros = await objectModel.find();

      return todosRegistros;
    } catch (error) {
      const msgErro = `Erro ao recuperar todos os registros: ${error.message}`;
      throw new Error(msgErro);
    }
  }

  static async getById(objectModel, id) {
    try {
      const registro = await objectModel.findById(id);

      return registro;
    } catch (error) {
      const msgErro = `Registro com Id ${id} não encontrado ${error.message}`;
      throw new Error(msgErro);
    }
  }

  static async add(
    objectModel,
    fnCriarObjEntidade,
    pNovoRegistro,
    session
  ) {
    try {
      const novoRegistro = fnCriarObjEntidade(pNovoRegistro);
      const response = await new objectModel(novoRegistro).save({ session });
      return response;
    } catch (error) {
      const msgErro = `Erro ao adicionar novo registro ${pNovoRegistro.nome}: ${error.message}`;
      throw new Error(msgErro);
    }
  }

  static async update(
    objectModel,
    id,
    pRegistroAlterado,
    session
  ) {
    try {
      //caso o pRegistroAlterado vier com _id e __v, remover esses campos para atualizar
      let { _id, __v, ...registroAlteradoPuro } = pRegistroAlterado;
      const updateResponse = await objectModel.updateOne(
        { _id: id },
        {
          ...registroAlteradoPuro,
          dt_alteracao: Date.now(),
        },
        { session }
      );

      return updateResponse;
    } catch (error) {
      const msgErro = `Registro com Id ${id} não pode ser atualizado: ${error.message}`;
      throw new Error(msgErro);
    }
  }

  static async delete(objectModel, id, session) {
    try {
      const deletedResponse = await objectModel.findOneAndDelete(
        {
          _id: id,
        },
        { session }
      );

      return deletedResponse;
    } catch (error) {
      const msgErro = `Registro com Id ${id} não pode ser excluído: ${error.message}`;
      throw new Error(msgErro);
    }
  }

  static async getOne(objectModel, query, session) {
    if (!!session) {
      return await objectModel.findOne(query).session(session);
    } else {
      return await objectModel.findOne(query);
    }
  }

  static async find(objectModel, query, session) {
    if (!!session) {
      return await objectModel.find(query).session(session);
    } else {
      return await objectModel.find(query);
    }
  }
}

module.exports = GenericCrudService;
