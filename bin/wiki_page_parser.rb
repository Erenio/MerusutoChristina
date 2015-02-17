require 'nokogiri'
require 'open-uri'
require 'json'

KeyMap = {
  "レアリティ" => "rare",
  "属性" => "element",
  "外皮" => "skin",
  "同時攻撃数" => "anum",
  "移動速度" => "mspd",
  "リーチ" => "aarea",
  "攻撃間隔" => "aspd",
  "タフネス" => "tenacity",
  "炎属性" => "fire",
  "水属性" => "aqua",
  "風属性" => "wind",
  "光属性" => "light",
  "闇属性" => "dark",

  "召喚SP" => "sklsp",
  "再召喚" => "sklcd",
  "スキル名" => "skill",
  "入手方法" => "obtain",

  "標準体力" => "life0",
  "大型体力" => "life1",
  "特大型体力" => "life2",
  "規格外体力" => "life",
  "天然規格外体力" => "life4",

  "標準攻撃力" => "atk0",
  "大型攻撃力" => "atk1",
  "特大型攻撃力" => "atk2",
  "規格外攻撃力" => "atk",
  "天然規格外攻撃力" => "atk4",

  "成長タイプ" => "type",
  "初期攻撃力" => "atk",
  "初期体力" => "life",
  "出身" => "country",
  "武器種別" => "weapon",
}
ValueMap = {
  "" => "暂缺",
  "??%" => "暂缺",
  "硬い" => 1,
  "柔らかい" => 3,
  "早熟" => 1,
  "平均" => 2,
  "晩成" => 3,
  "炎" => 1,
  "水" => 2,
  "風" => 3,
  "光" => 4,
  "闇" => 5,
  "斬撃" => 1,
  "突撃" => 2,
  "打撃" => 3,
  "弓矢" => 4,
  "魔法" => 5,
  "銃弾" => 6,
  "回復" => 7,
  "炎/水/風/光/闇" => 1,
}

def parse_wiki_page url, id = nil, strict = false
  doc = Nokogiri::HTML(open(url))
  json = Hash.new
  json["id"] = id.to_i if id
  name = doc.css("#js_wikidb_main_name").text
  if name =~ /「(.+)」(.+)/
    json["title"] = "[#{$1}]"
    json["name"] = $2
  else
    json["name"] = name
  end
  doc.css(".ui_wikidb_title").each do |doc|
    key = doc.text.strip
    value = doc.parent.text.sub(key, '').sub(" ", '').strip
    if KeyMap[key]
      key = KeyMap[key]
    else
      next if strict
    end
    value = if value =~ /^\d+\.\d+$/
        value.to_f
      elsif value =~ /^\d+.$/
        value.to_i
      elsif value =~ /^.\d+$/
        value.sub(/[☆★]/, '').to_i
      elsif ValueMap[value]
        ValueMap[value]
      else
        value
      end

    json[key] = value
  end
  doc.css("[class^='zokusei']").each do |doc|
    key = doc.text.strip
    value = doc.next.text.sub(" ", '').strip
    key = KeyMap[key] if KeyMap[key]
    value = ValueMap[value] if ValueMap[value]
    value = value.to_f / 100 if value =~ /^\d+\%$/
    json[key] = value
  end
  json
end

if __FILE__ == $0
  URLs = {
    330 => "http://xn--cckza4aydug8bd3l.gamerch.com/%E3%83%97%E3%83%AB%E3%83%8A%E3%83%BC",
    335 => "http://xn--cckza4aydug8bd3l.gamerch.com/%E3%83%9A%E3%83%AC%E3%83%AD",
    340 => "http://xn--cckza4aydug8bd3l.gamerch.com/%E3%83%95%E3%83%BC%E3%83%89%E3%83%AA%E3%82%A3%E3%83%89%E3%83%BC%E3%83%AB",
    341 => "http://xn--cckza4aydug8bd3l.gamerch.com/%E3%83%86%E3%82%A3%E3%83%A9%E3%83%9F%E3%82%B9%E3%82%BF",
    342 => "http://xn--cckza4aydug8bd3l.gamerch.com/%E3%83%99%E3%83%AB%E3%83%8A%E3%83%87%E3%83%83%E3%82%BF",
    343 => "http://xn--cckza4aydug8bd3l.gamerch.com/%E6%BC%86%E9%BB%92%E7%AB%9C%E3%83%99%E3%83%AB%E3%83%8A%E3%83%87%E3%83%83%E3%82%BF",
  }

  AllJSON = []

  URLs.each do |id, url|
    json = parse_wiki_page url, id, false
    AllJSON.push json
  end
  puts JSON.generate AllJSON
end
