require 'httparty'
require 'json'
# step responsável por realizar a chamada HTTP GET no endpoint da VR
Given('que eu faço uma requisição get para o endpoint da vr') do
  @response = HTTParty.get('https://portal.vr.com.br/api-web/comum/enumerations/VRPAT')
  @body = JSON.parse(@response.body)
end
# step responsável por validar a estrutura da resposta da API
Then('o JSON deve conter a chave {string}') do |key|
  raise "Status diferente de 200" unless @response.code == 200
  raise "Chave não encontrada" unless @body.key?(key)
  raise "Valor não é array" unless @body[key].is_a?(Array)

   # armazena a lista para uso no próximo step
  @list = @body[key]
    # seleciona aleatoriamente um item da lista
  @random_item = @list.sample
end

Then('deve exibir um tipo de estabelecimento aleatório') do
  raise "Nenhum item encontrado" if @random_item.nil?

  puts "Tipo sorteado: #{@random_item['label']}"
end