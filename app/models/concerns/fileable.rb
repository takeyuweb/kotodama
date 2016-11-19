module Fileable
  extend ActiveSupport::Concern
  included do
    attr_accessor :file
    after_save :store_file
  end

  module ClassMethods
    def file_directory
      Rails.root.join('public', 'uploads', self.name.underscore)
    end
  end

  def file_directory
    self.class.file_directory
  end

  private def store_file
    unless FileTest.directory?(file_directory)
      FileUtils.mkpath(file_directory)
    end
    File.open(file_path, 'wb') do |f|
      while buffer = file.read(1024)
        f.write buffer
      end
    end
  end

  def file_path
    @file_path ||= File.join(file_directory, "#{id}.wav")
  end

  def file_length
    @file_length ||= File.size(file_path)
  end
end