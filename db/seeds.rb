# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
5.times do |i|
    Post.create!(title: "サンプル記事 #{i + 1}", body: "本文です #{i + 1}")
end

3.times do |i|
    Project.create!(title: "作品 #{i + 1}", description: "プロジェクトの説明 #{i + 1}")
end
  