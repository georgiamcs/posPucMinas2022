export enum RetornoHttp {
  HTTP_UNKNOW = 0,
  HTTP_OK = 200, // requisição foi bem sucedida.
  HTTP_CREATED = 201, // A requisição foi bem sucedida e um novo recurso foi criado como resultado.
  HTTP_UNAUTHORIZED = 401, // Embora o padrão HTTP especifique "unauthorized", semanticamente, essa resposta significa "unauthenticated". Ou seja, o cliente deve se autenticar para obter a resposta solicitada.
  HTTP_FORBIDEN = 403, // O cliente não tem direitos de acesso ao conteúdo portanto o servidor está rejeitando dar a resposta.
  HTTP_NOT_FOUND = 404, // O servidor não pode encontrar o recurso solicitado.
  HTTP_NOT_ACCEPTED = 406, // Essa resposta é enviada quando o servidor da Web após realizar a negociação de conteúdo orientada pelo servidor, não encontra nenhum conteúdo seguindo os critérios fornecidos pelo agente do usuário.
  HTTP_CONFLIT = 409, // Esta resposta será enviada quando uma requisição conflitar com o estado atual do servidor.
  HTTP_INTERNAL_SERVER_ERRO = 500, // O servidor encontrou uma situação com a qual não sabe lidar.
}
