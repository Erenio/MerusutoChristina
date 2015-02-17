require 'open-uri'
require 'fileutils'
require 'mini_magick'

BASEURLJP = "http://dbcj6kgtik9tl.cloudfront.net/toto_image_s3/jp_v2"
BASEURLCN = "http://static.miracle.happyelements.cn/toto_image/unity"

def download baseurl, range
  range.each do |index|
    begin
      url = baseurl.sub("#INDEX#", index.to_s)
      filename = File.basename(url)
      print "\rDownload: #{filename}   "
      image = open(url)
      File.open("unity3d.unity3d", "w") do |file|
        file.puts image.read
      end

      print "\rExtract: #{filename}    "
      `disunity extract unity3d.unity3d 2>&1`
    rescue Exception => e
      puts "\rError: #{filename}, #{e}"
    end
  end
end

def convert path
  FileUtils.mkdir_p "tga"
  FileUtils.mkdir_p "png/#{path}"
  FileUtils.mv Dir["unity3d/**/*.tga"], "tga"

  Dir["tga/*.tga"].each do |file|
    begin
      filename = File.basename(file)
      print "\rConvert: #{filename}    "
      image = MiniMagick::Image.open(file)
      image.format("png")
      image.write("png/#{path}/#{File.basename(file, ".*")}.png")
    rescue
      puts "\rError: #{filename}, #{e}"
    end
  end
end

def cleanup
  FileUtils.rm_rf "unity3d.unity3d"
  FileUtils.rm_rf "unity3d"
  FileUtils.rm_rf "tga"
end

def setup
  FileUtils.mkdir_p "tmp"
  FileUtils.cd "tmp"
  cleanup
end

def resources key1, key2, range
  case key1
  when :jp
    baseurl = BASEURLJP
  when :cn
    baseurl = BASEURLCN
  end

  case key2
  when :unit
    path1 = "unit/unit_btn"
    path2 = "unit/unit_large"
    path3 = "units"
  when :monster
    path1 = "monster/monster_btn"
    path2 = "monster/monster_large_ns"
    path3 = "monsters"
  end

  download "#{baseurl}/#{path1}_#INDEX#.Android.unity3d", range
  convert "#{path3}/thumbnail"
  cleanup

  download "#{baseurl}/#{path2}_#INDEX#.Android.unity3d", range
  convert "#{path3}/original"
  cleanup
end


if __FILE__ == $0
  setup
  # resources :jp, :monster, (330..350)
  resources :cn, :monster, [100021,100022]

  # resources :jp, :unit, [498]
end
