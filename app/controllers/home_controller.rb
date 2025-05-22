class HomeController < ApplicationController
    def index
      @recent_posts = Post.order(created_at: :desc).limit(5)
      @recent_projects = Project.order(created_at: :desc).limit(3)
    end
  end
  