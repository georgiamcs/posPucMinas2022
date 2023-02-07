const FornecedorService = require("../services/FornecedorService");

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
  const id = req.params.id;

  try {
    const fornecedor = await FornecedorService.getFornecedorById(id);
    res.json(fornecedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.getAll = async (req, res) => {
  const fornecedores = await FornecedorService.getAllFornecedores();

  try {
    if (!fornecedores) {
      return res.status(404).json("Não existem fornecedores cadastrados!");
    }

    res.json(fornecedores);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }  
};

exports.add = async (req, res) => {
  try {
    const fornecedorAdicionado = await FornecedorService.addFornecedor(req.body);
    res.status(201).json(fornecedorAdicionado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  let id = req.params.id;

  try {
    
    fornecedorAlterado = createFornecedor(req);
    const fornecedorAtualizado = await FornecedorService.updateFornecedor(
      id,
      fornecedorAlterado
    );

    if (fornecedorAtualizado.nModified === 0) {
      return res.status(404).json({});
    }

    res.json(fornecedorAtualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResponse = await FornecedorService.deleteFornecedor(id);
    res.json(deleteResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
