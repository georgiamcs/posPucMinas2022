module.exports = class ControleEstoqueVacina {

  constructor(
    vacina,
    usuario,
    data_evento,
    tipo_evento,
    tipo_motivo,
    descricao_evento,
    justificativa_evento,
    qtd_estoque_antes,
    qtd_estoque_depois
  ) {
    this.vacina = vacina;
    this.usuario = usuario;
    this.data_evento = data_evento;
    this.tipo_evento = tipo_evento;
    this.tipo_motivo = tipo_motivo;
    this.descricao_evento = descricao_evento;
    this.justificativa_evento = justificativa_evento;
    this.qtd_estoque_antes = qtd_estoque_antes;
    this.qtd_estoque_depois = qtd_estoque_depois;
  }
};
