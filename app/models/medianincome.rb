class Medianincome < ActiveRecord::Base
  def self.incomes
    @maleincomes = Medianincome.where(race: "ALL", gender: "MALE").to_a
    @femaleincomes = Medianincome.where(race: "ALL", gender: "FEMALE").to_a
    @average_incomes = []
    @maleincomes.each_with_index do |maleincome, i|
      @average_incomes << (maleincome.income + @femaleincomes[i].income)/2
    end
    @average_incomes

  end
end

