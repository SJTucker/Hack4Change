require 'libxml'


source = LibXML::XML::Parser.file('./districts.kml')
results = source.parse.root

#children = results.children
puts source.find('/ul', './districts.kml')

uls = []
children.each do |child|
  uls << child.find('ul')
end

lis = []
uls.each do |ul|
  lis <<  ul.find('li')
end

spans = []
lis.each do |li|
  puts li.find('.').content
end

#puts children.first.attributes.inspect
