//TODO: DEIXAR POR DEFAULT COM TRANSACAO E SESSION VER SE TEM COMO TER FUNCAO DE DONE 
// PARA REALIZAR APOS A OPERACAO PRINCIPAL PARA EVITAR DE TER CONTROLLES ESPECIFICOS 
// (VIDE ATUALIZACAO ESTOQUE E CONTROLE ESTOQUE)
const { AutorizacaoService } = require("../../services/autorizacao.service");
const cnst = require("../../constantes");

class GenericCrudController {
  constructor(
    service,
    objectModel,
    perfisRequeridos,
    fnCriarObjEntidade,
    fnVerificarRegDuplicado,
    fnPodeExcluir
  ) {
    this.service = service;
    this.objectModel = objectModel;
    this.perfisRequeridos = perfisRequeridos;
    this.fnCriarObjEntidade = fnCriarObjEntidade;
    this.fnVerificarRegDuplicado = fnVerificarRegDuplicado;
    this.fnPodeExcluir = fnPodeExcluir;
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
      try {
        const regDuplicado = await this.fnVerificarRegDuplicado(req.body, null);

        if (!!regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
        } else {
          const regAdicionado = await this.service.add(
            this.objectModel,
            this.fnCriarObjEntidade,
            req.body
          );
          res.status(cnst.RETORNO_HTTP.HTTP_CREATED).json(regAdicionado);
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

  update = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      let id = req.params.id;

      try {
        const regDuplicado = await this.fnVerificarRegDuplicado(req.body);

        if (!!regDuplicado) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.REGISTRO_DUPLICADO });
        } else {
          let regAlterado = this.fnCriarObjEntidade(req.body);
          const regAtualizado = await this.service.update(
            this.objectModel,
            id,
            regAlterado
          );

          if (regAtualizado.modifiedCount === 0) {
            return res
              .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
              .json({ error: `Registro com id ${id} não foi atualizado.` });
          } else {
            res.status(cnst.RETORNO_HTTP.HTTP_OK).json(regAtualizado);
          }
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

  delete = async (req, res) => {
    if (AutorizacaoService.checarPerfis(req, this.perfisRequeridos)) {
      let id = req.params.id;

      try {
        const podeExcluir = await this.fnPodeExcluir(id,null);

        if (!podeExcluir) {
          res
            .status(cnst.RETORNO_HTTP.HTTP_CONFLIT)
            .json({ error: cnst.MENSAGEM.NAO_PODE_EXCLUIR });
        } else {
          const deleteResponse = await this.service.deleteById(
            this.objectModel,
            id
          );
          res.status(cnst.RETORNO_HTTP.HTTP_OK).json(deleteResponse);
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
}

module.exports = GenericCrudController;
