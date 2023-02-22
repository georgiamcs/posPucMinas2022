class GenericCrudService {
  static async getAll(objectModel, session, query, camposRecuperar) {
    const vlSession = !!session ? session : null;
    try {
      let todosRegistros;
      if (!!camposRecuperar) {
        todosRegistros = await objectModel
          .find(query, camposRecuperar)
          .session(vlSession);
      } else {
        todosRegistros = await objectModel.find(query).session(vlSession);
      }
      return todosRegistros;
    } catch (error) {
      const msgErro = `Erro ao recuperar todos os registros: ${error.message}`;
      throw new Error(msgErro);
    }
  }

  static async getById(objectModel, id, session, camposRecuperar) {
    const vlSession = !!session ? session : null;
    let registro;
    try {
      if (!!camposRecuperar) {
        registro = await objectModel
          .findById(id, camposRecuperar)
          .session(vlSession);
      } else {
        registro = await objectModel.findById(id).session(vlSession);
      }

      return registro;
    } catch (error) {
      const msgErro = `Registro com Id ${id} não encontrado ${error.message}`;
      throw new Error(msgErro);
    }
  }

  static async getOne(objectModel, query, session, camposRecuperar) {
    const vlSession = !!session ? session : null;

    if (!!camposRecuperar) {
      return await objectModel
        .findOne(query, camposRecuperar)
        .session(vlSession);
    } else {
      return await objectModel.findOne(query).session(vlSession);
    }
  }

  static async find(objectModel, query, session, camposRecuperar) {
    const vlSession = !!session ? session : null;

    if (!!camposRecuperar) {
      return await objectModel.find(query, camposRecuperar).session(vlSession);
    } else {
      return await objectModel.find(query).session(vlSession);
    }
  }

  static async add(objectModel, pNovoRegistro, session) {
    try {
      const response = await new objectModel(pNovoRegistro).save({ session });
      return response;
    } catch (error) {
      const msgErro = `Erro ao adicionar novo registro ${pNovoRegistro.nome}: ${error.message}`;
      throw new Error(msgErro);
    }
  }

  static async update(objectModel, id, pRegistroAlterado, session) {
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

  static async deleteById(objectModel, id, session) {
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

  static async deleteByQuery(objectModel, query, session) {
    try {
      const deletedResponse = await objectModel.deleteMany(query, { session });

      return deletedResponse;
    } catch (error) {
      const msgErro = `Registros não podem ser excluídos. Query: ${query}. Erro: ${error.message}`;
      throw new Error(msgErro);
    }
  }
}

module.exports = GenericCrudService;
