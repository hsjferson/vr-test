def remove_text_after_symbols(text, symbols)
  index = symbols.map { |s| text.index(s) }.compact.min
  index ? text[0...index].strip : text
end
