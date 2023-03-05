const RETORNO_HTTP = Object.freeze({
  HTTP_OK: 200, // requisição foi bem sucedida.
  HTTP_CREATED: 201, // A requisição foi bem sucedida e um novo recurso foi criado como resultado.
  HTTP_BAD_REQUEST: 400, // significa que o servidor não entendeu a requisição pois está com uma sintaxe inválida.
  HTTP_UNAUTHORIZED: 401, // Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta solicitada.  
  HTTP_FORBIDEN: 403, // O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta.
  HTTP_NOT_FOUND: 404, // O servidor não pode encontrar o recurso solicitado.
  HTTP_NOT_ACCEPTED: 406, // Essa resposta é enviada quando o servidor da Web após realizar a negociação de conteúdo orientada pelo servidor, não encontra nenhum conteúdo seguindo os critérios fornecidos pelo agente do usuário.
  HTTP_CONFLIT: 409, // Esta resposta será enviada quando uma requisição conflitar com o estado atual do servidor.
  HTTP_INTERNAL_SERVER_ERRO: 500, // O servidor encontrou uma situação com a qual não sabe lidar.
}); 

const TIPO_USUARIO = Object.freeze({
  ADMINISTRADOR: "A",
  ANALISTA_COMPRAS: "L",
  CLIENTE: "C",
  SECRETARIA: "S",
  TECNICO_ENFERMAGEM: "T",
}); 

const TIPO_ATUALIZACAO_ESTOQUE = Object.freeze({
  ADICIONAR: "A",
  REMOVER: "R",
}); 

const TIPO_OPERACAO = Object.freeze({
  INSERT: "I",
  UPDATE: "U",
  DELETE: "D"
}); 

const MENSAGEM = Object.freeze({
  REGISTRO_DUPLICADO:
    "Já existe registro com as mesmas características na base.",
  NAO_PODE_EXCLUIR:
    "Não é possível excluir registro pois há outros registros ativos relacionados na base de dados.",
}); 

const TIPO_EVENTO_CONTROLE_ESTOQUE = Object.freeze({
  ENTRADA: "E",
  SAIDA: "S",
});   

const TIPO_MOTIVO_CONTROLE_ESTOQUE = Object.freeze({
  CADASTRO_INICIAL: "I",
  DESCARTE: "D",
  VACINACAO: "V",
  COMPRA: "C",
  AJUSTE_ESTOQUE: "A",
  ALTERACAO_COMPRA: "AC",
  ALTERACAO_VACINACAO: "AV",
  ALTERACAO_DESCARTE: "AD",
  EXCLUSAO_COMPRA: "EC",
  EXCLUSAO_VACINACAO: "EV",
  EXCLUSAO_DESCARTE: "ED",
});  

module.exports = {
  RETORNO_HTTP,
  TIPO_USUARIO,
  TIPO_ATUALIZACAO_ESTOQUE,
  MENSAGEM,
  TIPO_EVENTO_CONTROLE_ESTOQUE,
  TIPO_MOTIVO_CONTROLE_ESTOQUE,
  TIPO_OPERACAO,
};

