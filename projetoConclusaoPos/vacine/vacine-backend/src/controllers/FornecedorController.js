const FornecedorService = require("../services/FornecedorService");
const cnst = require("../constantes");
const { PERFIS } = require("../services/AutorizacaoService");

const perfisRequeridos = [
  cnst.PERFIS.ADMINISTRADOR,
  cnst.PERFIS.CADASTRADOR_COMPRA,
  cnst.PERFIS.CADASTRADOR_FORNECEDOR,
];

function createFornecedor(req) {
  let fornecedor = {};
  fornecedor.nome = req.body.nome;
  fornecedor.email = req.body.email;
  fornecedor.cnpj = req.body.cnpj;
  fornecedor.endereco = req.body.endereco;
  fornecedor.tel_celular = req.body.tel_celular;
  fornecedor.tel_fixo = req.body.tel_fixo;
  return fornecedor;
}

exports.get = async (req, res) => {
  if (AutorizacaoService.checarPerfis(req, perfisRequeridos)) {
    const id = req.params.id;

    try {
      const fornecedor = await FornecedorService.getFornecedorById(id);
      res.json(fornecedor);
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

exports.getAll = async (req, res) => {
  if (AutorizacaoService.checarPerfis(req, perfisRequeridos)) {
    const fornecedores = await FornecedorService.getAllFornecedores();

    try {
      if (!fornecedores) {
        return res
          .status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND)
          .json("Não existem fornecedores cadastrados!");
      }

      res.json(fornecedores);
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

exports.add = async (req, res) => {
  if (AutorizacaoService.checarPerfis(req, perfisRequeridos)) {
    try {
      const fornecedorAdicionado = await FornecedorService.addFornecedor(
        req.body
      );
      res.status(201).json(fornecedorAdicionado);
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

exports.update = async (req, res) => {
  if (AutorizacaoService.checarPerfis(req, perfisRequeridos)) {
    let id = req.params.id;

    try {
      fornecedorAlterado = createFornecedor(req);
      const fornecedorAtualizado = await FornecedorService.updateFornecedor(
        id,
        fornecedorAlterado
      );

      if (fornecedorAtualizado.nModified === 0) {
        return res.status(cnst.RETORNO_HTTP.HTTP_NOT_FOUND).json({});
      }

      res.json(fornecedorAtualizado);
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

exports.delete = async (req, res) => {
  if (AutorizacaoService.checarPerfis(req, perfisRequeridos)) {
    let id = req.params.id;

    try {
      const deleteResponse = await FornecedorService.deleteFornecedor(id);
      res.json(deleteResponse);
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
