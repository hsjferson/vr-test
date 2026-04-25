Feature: Remover texto após símbolos

Scenario Outline: Validar remoção de texto
  Given a string "<entrada>"
  And os marcadores <marcadores>
  When eu remover o texto
  Then o resultado deve ser "<saida>"

Examples:
| entrada                                           | marcadores           | saida                          |
| bananas, tomates # e ventiladores                 | ["#", "!"]          | bananas, tomates              |
| o rato roeu a roupa $ do rei % de roma           | ["%", "!"]          | o rato roeu a roupa $ do rei  |
| the quick brown fox & jumped over * the lazy dog | ["&", "*", "%", "!"]| the quick brown fox           |
