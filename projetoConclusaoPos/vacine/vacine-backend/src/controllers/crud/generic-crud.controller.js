const AutorizacaoService = require("../../services/autorizacao.service");
const cnst = require("../../constantes");
const mongoose = require("mongoose");
const Acesso = require("../../setup/acesso");

class GenericCrudController {
  constructor(service, objectModel, temaAcesso) {
    this.service = service;
    this.objectModel = objectModel;
    this.temaAcesso = temaAcesso;
  }

  async createObj(obj, user) {
    throw new Error("Função precisa ser implementada nas classes filhas");
  }

  async temDuplicado(obj, session, tipoOperacao) {
    return false;
  }

  async podeExcluir(id, session) {
    return true;
  }

  async doOnAdd(regAdicionado, user, session) {
    return null;
  }

  async doOnDelete(id, objBeforeDelete, objDeleted, user, session) {
    return null;
  }

  async doOnUpdate(id, objBeforeUpdate, objUpdated, user, session) {
    return null;
  }

  getById = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_PROPRIO,
        Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
      ])
    ) {
      const id = req.params.id;

      if (id.length !== 24) {
        //tamanho do campo id no mongodb
        return res
          .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
          .json({ error: `Registro com Id ${id} não encontrado.` });
      }

      try {
        const registro = await this.service.getById(this.objectModel, id);
        if (registro) {
          res.json(registro);
        } else {
          res
            .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
            .json({ error: `Registro com Id ${id} não encontrado.` });
        }
      } catch (error) {
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  getAll = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.VISUALIZAR_TODOS,
        Acesso.TIPO_ACESSO_USUARIO.SELECIONAR,
      ])
    ) {
      try {
        const registros = await this.service.getAll(this.objectModel);
        res.json(registros);
      } catch (err) {
        return res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: err.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  add = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.INCLUIR,
      ])
    ) {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const regDuplicado = await this.temDuplicado(
          req.body,
          session,
          cnst.TIPO_OPERACAO.INSERT
        );

        if (regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
        } else if (regDuplicado == null || regDuplicado == undefined) {
          res.status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO).json({
            error: "Não foi possível verififcar se registro está duplicado",
          });
        } else {
          const novoRegistro = this.createObj(req.body, req.user);
          const regAdicionado = await this.service.add(
            this.objectModel,
            novoRegistro,
            session
          );

          await this.doOnAdd(regAdicionado, req.user, session);

          await session.commitTransaction();
          res.status(cnst.RETORNO_HTTP.HTTP_CREATED).json(regAdicionado);
        }
      } catch (error) {
        await session.abortTransaction();
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      } finally {
        session.endSession();
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  update = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.ALTERAR,
      ])
    ) {
      let id = req.params.id;

      if (id.length !== 24) {
        //tamanho do campo id no mongodb
        return res
          .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
          .json({ error: `Registro com Id ${id} não encontrado.` });
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const regDuplicado = await this.temDuplicado(
          { _id: id, ...req.body },
          session,
          cnst.TIPO_OPERACAO.UPDATE
        );

        if (regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
        } else if (regDuplicado == null || regDuplicado == undefined) {
          res.status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO).json({
            error: "Não foi possível verififcar se registro está duplicado",
          });
        } else {
          const objBeforeUpdate = await this.service.getById(
            this.objectModel,
            id,
            session
          );
          let regAlterado = this.createObj(req.body, req.user);
          const objUpdated = await this.service.update(
            this.objectModel,
            id,
            regAlterado
          );

          if (objUpdated.modifiedCount === 0) {
            return res
              .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
              .json({ error: `Registro com id ${id} não foi atualizado.` });
          } else {
            await this.doOnUpdate(
              id,
              objBeforeUpdate,
              regAlterado,
              req.user,
              session
            );

            await session.commitTransaction();
            res.status(cnst.RETORNO_HTTP.HTTP_OK).json();
          }
        }
      } catch (error) {
        await session.abortTransaction();
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      } finally {
        session.endSession();
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };

  delete = async (req, res) => {
    if (
      AutorizacaoService.checarTemPerfil(req, this.temaAcesso, [
        Acesso.TIPO_ACESSO_USUARIO.EXCLUIR,
      ])
    ) {
      let id = req.params.id;
      
      if (id.length !== 24) {
        //tamanho do campo id no mongodb
        return res
          .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
          .json({ error: `Registro com Id ${id} não encontrado.` });
      }

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const podeExcluir = await this.podeExcluir(id, session);

        if (!podeExcluir) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.NAO_PODE_EXCLUIR });
        } else {
          const objBeforeDelete = await this.service.getById(
            this.objectModel,
            id,
            session
          );
          const objDeleted = await this.service.deleteById(
            this.objectModel,
            id,
            session
          );
          await this.doOnDelete(
            id,
            objBeforeDelete,
            objDeleted,
            req.user,
            session
          );

          await session.commitTransaction();
          res.status(cnst.RETORNO_HTTP.HTTP_OK).json(objDeleted);
        }
      } catch (error) {
        await session.abortTransaction();
        res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: error.message });
      } finally {
        session.endSession();
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Sem permissão para acessar o serviço." });
    }
  };
}

module.exports = GenericCrudController;
