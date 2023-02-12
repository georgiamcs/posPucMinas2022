const RETORNO_HTTP = Object.freeze({
  HTTP_OK: 200, // requisição foi bem sucedida.
  HTTP_CREATED: 201, // A requisição foi bem sucedida e um novo recurso foi criado como resultado.
  HTTP_FORBIDEN: 403, // O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta.
  HTTP_NOT_FOUND: 404, // O servidor não pode encontrar o recurso solicitado.
  HTTP_INTERNAL_SERVER_ERRO: 500, // O servidor encontrou uma situação com a qual não sabe lidar.
}); 

const PERFIS = Object.freeze({
  ADMINISTRADOR: "ADMIN",
  SECRETARIA: "SECRET",
  CLIENTE: "CLIENTE",
  CADASTRADOR_COMPRA: "CAD-COMPRA",
  CADASTRADOR_FORNECEDOR: "CAD-FORNECEDOR",
  CADASTRADOR_USUARIO: "CAD-USUARIO",
  CADASTRADOR_VACINA: "CAD-VACINA",
  CADASTRADOR_VACINACAO: "CAD-VACINACAO",
});

module.exports = {
  PERFIS,
  RETORNO_HTTP
};

