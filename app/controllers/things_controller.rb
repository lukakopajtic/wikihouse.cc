class ThingsController < ApplicationController
  
  def index
    if request.path == "/library/technologies"
      render "static/technologies"
    else
      params[:library_category_id] ||= 'technologies'
      @repos = Repo.where(kind: params[:library_category_id].singularize.capitalize)
    end
  end

  def show
    repos = Repo.where("LOWER(name) = ?", params[:id].downcase)

    @breadcrumbs = []
    split_path = request.path.split("/").reject(&:blank?)
    split_path.each_with_index do |crumb, index|
      @breadcrumbs.push([crumb.capitalize, ['',split_path[0..index]].flatten.join("/") ])
    end
    @breadcrumbs = @breadcrumbs

    if repos.length > 0
      @repo = repos.first
    else
      redirect_to library_categories_path
    end
  end

end
