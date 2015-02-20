require 'open-uri'
require 'json'

AtkValueMap = {
  "atk0" => 1.0,
  "atk1" => 1.35,
  "atk2" => 1.55,
  "atk" => 1.7,
  "atk4" => 1.8
}
LifeValueMap = {
  "life0" => 1.0,
  "life1" => 1.35,
  "life2" => 1.55,
  "life" => 1.7,
  "life4" => 1.8
}

json = JSON.load(open("source/data/monsters.json"))
json.each do |row|
  values = []
  LifeValueMap.each do |key, n|
    value = row[key]
    values.push value / n if value.kind_of? Fixnum
    row.delete key
  end
  row["life"] = if values.any?
      (values.reduce(&:+) / values.size).to_i
    else
      "暂缺"
    end

  values = []
  AtkValueMap.each do |key, n|
    value = row[key]
    values.push value / (n ** 2.36) if value.kind_of? Fixnum
    row.delete key
  end
  row["atk"] = if values.any?
      (values.reduce(&:+) / values.size).to_i
    else
      "暂缺"
    end
end

puts JSON.generate(json)
