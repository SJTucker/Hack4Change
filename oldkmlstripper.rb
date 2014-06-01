

output = File.read('districts.kml')
results = output.scan(/DISTRICT<\/span>:<\/strong> <span class="atr-value">\d+/)
puts results
