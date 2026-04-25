require_relative '../../support/helper'

# step que recebe a string de entrada do cenário
Given('a string {string}') do |entrada|
  @entrada = entrada
end
# step que recebe os marcadores que faz o parse para array
Given(/^os marcadores (.*)$/) do |marcadores|
  @marcadores = marcadores
                  # remove colchetes e aspas da string recebida
                  .gsub(/[\[\]\"]/,'')
                  # divide por vírgula
                  .split(',')
                  # remove espaços extras
                  .map(&:strip)
end
# step que executa a lógica principal de remoção do texto
When('eu remover o texto') do
  # chama o método helper responsável pela regra de negócio
  @resultado = remove_text_after_symbols(@entrada, @marcadores)
end 
# step que valida o resultado final esperado
Then('o resultado deve ser {string}') do |saida|
  # compara o resultado obtido com o esperado
  raise "Resultado incorreto" unless @resultado == saida
end