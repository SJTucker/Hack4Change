require 'active_record'
ActiveRecord::Base.establish_connection(
  adapter:  'sqlite3',
  database: 'db/hack4change.sqlite',
  host:     'localhost'
)
require_relative 'app/models/medianincome'
@incomes = Medianincome.incomes

opened_file = File.open('districts.kml')
read_file = opened_file.read
@district_order = read_file.scan(/<span class="atr-name">DISTRICT<\/span>:<\/strong> <span class="atr-value">\d+/)






######array of districts in the order they appear in the kml#######
single_digit_length = @district_order[0].length
@district_nums = []

@district_order.each do |district|
  if district.length == single_digit_length
    @district_nums << district.split(//).last(1).join
  else
    @district_nums << district.split(//).last(2).join
  end
end

#######correcting district incomes order########

@corrected_district_incomes = []

@district_nums.each do |district|
  @corrected_district_incomes << @incomes[district.to_i-1]
end

#########colors array########
@district_colors = []
@corrected_district_incomes.each do |income|
  g = (255 * ((income.to_f-20000)/60000)).floor.to_s(16)
  color_string = "7f00" + g + "00"
  @district_colors << color_string
end

@scanned_colors = read_file.scan(/<color>[a-z,0-9]+<\/color>/)

########changing color fills in document########
@scanned_colors.each_with_index do |color, i|
  read_file[color] = "<color>" + @district_colors[(i/4).floor].to_s + "</color>"
end

File.open('districts.kml', 'w') do  |file| 
  file.truncate(0)
  file << read_file
end

