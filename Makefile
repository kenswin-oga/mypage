# サービスの起動
up:
	docker compose up -d

# サービスの停止
down:
	docker compose down

# ログの表示
logs:
	docker compose logs -f

in:
	docker compose exec web bash

# ビルドの実行
build:
	docker compose build

# コンテナの再起動
reboot:
	docker compose down
	docker compose up -d

# 不要なイメージやキャッシュをクリアして再ビルド
rebuild:
	docker compose down --rmi all --volumes
	docker compose up -d --build

dev:
	docker compose exec web yarn build

migrate: # 差分マイグレートを実行
	docker compose exec web rails db:migrate

seed:
	docker compose exec web rails db:seed
