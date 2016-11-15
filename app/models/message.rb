class Message < ApplicationRecord
  attr_accessor :file
  after_save :store_file

  UPLOAD_FILE_DIR = Rails.root.join('public', 'uploads')

  private def store_file
    FileUtils.mkpath(UPLOAD_FILE_DIR) unless FileTest.directory?(UPLOAD_FILE_DIR)
    File.open(file_path, 'wb') do |f|
      while buffer = file.read(1024)
        f.write buffer
      end
    end
  end

  def file_path
    @file_path ||= File.join(UPLOAD_FILE_DIR, "#{id}.wav")
  end

  def file_length
    @file_length ||= File.size(file_path)
  end
end
