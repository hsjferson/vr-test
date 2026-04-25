Feature: Validar endpoint VRPAT

Scenario: Validar retorno da API
  Given que eu faço uma requisição GET para o endpoint VRPAT
  Then o JSON deve conter a chave "typeOfEstablishment"
  And deve exibir um tipo de estabelecimento aleatório
