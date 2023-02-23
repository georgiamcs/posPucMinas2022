//TODO: DEIXAR POR DEFAULT COM TRANSACAO E SESSION VER SE TEM COMO TER FUNCAO DE DONE
// PARA REALIZAR APOS A OPERACAO PRINCIPAL PARA EVITAR DE TER CONTROLLES ESPECIFICOS
// (VIDE ATUALIZACAO ESTOQUE E CONTROLE ESTOQUE)
const { AutorizacaoService } = require("../../services/autorizacao.service");
const cnst = require("../../constantes");
const mongoose = require("mongoose");

class GenericCrudController {
  constructor(service, objectModel, perfisRequeridos) {
    this.service = service;
    this.objectModel = objectModel;
    this.perfisRequeridos = perfisRequeridos;
  }

  async createObj(obj, user) {
    throw new Error("Função precisa ser implementada nas classes filhas");
  }

  async temDuplicado(obj) {
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
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      const id = req.params.id;

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
        .json({ error: "Acesso negado" });
    }
  };

  getAll = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      const registros = await this.service.getAll(this.objectModel);

      try {
        if (!registros) {
          return res
            .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
            .json("Não existem registros cadastrados!");
        }

        res.json(registros);
      } catch (err) {
        return res
          .status(cnst.RETORNO_HTTP.HTTP_INTERNAL_SERVER_ERRO)
          .json({ error: err.message });
      }
    } else {
      res
        .status(cnst.RETORNO_HTTP.HTTP_FORBIDEN)
        .json({ error: "Acesso negado" });
    }
  };

  add = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        const regDuplicado = await this.temDuplicado(req.body, session);

        if (!!regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
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
        .json({ error: "Acesso negado" });
    }
  };

  update = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      let id = req.params.id;

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const regDuplicado = await this.temDuplicado(req.body);

        if (!!regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
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
              objUpdated,
              req.user,
              session
            );

            await session.commitTransaction();
            res.status(cnst.RETORNO_HTTP.HTTP_OK).json(objUpdated);
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
        .json({ error: "Acesso negado" });
    }
  };

  delete = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      let id = req.params.id;

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
        .json({ error: "Acesso negado" });
    }
  };
}

module.exports = GenericCrudController;
