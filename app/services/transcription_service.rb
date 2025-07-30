require 'fileutils'
require 'base64'

class TranscriptionService
  attr_reader :data_url, :results
  def initialize(data_url)
    @data_url = data_url
  end

  def call
    tmp_folder = "tmp/transcriptions/audios/#{SecureRandom.hex(6)}-#{Date.new.to_s}"
    FileUtils.mkdir_p(tmp_folder)
    # uri = URI::Data.new(data_url)
    # File.write(, uri.data)
    start = data_url.index(',') + 1                   # .index used here
    x = Base64.decode64 data_url[start..-1]
    File.open("#{tmp_folder}/audio-recording.mp3",'wb') {|file| file.write x}
  end
end