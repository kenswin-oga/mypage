class Post < ApplicationRecord

    validates :title, length: {maximum: 50}, presence: true
    validates :body, length: {maximum:100}, presence: true
end
