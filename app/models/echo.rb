class Echo < ApplicationRecord
  include Fileable
  validates :response_at, presence: true
end
