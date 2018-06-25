module ApplicationHelper
  def self.paginate(paginate_on, pagination)
    paginate_on.paginate(page: pagination[:page], per_page: pagination[:per_page])
  end

  def self.construct_patingation_params(params, model_class)
    pagination = {
      page: ((params[:pagination] && params[:pagination][:page]) || 1).to_i,
      per_page: ((params[:pagination] && params[:pagination][:per_page]) || 25).to_i,
      count: model_class.count
    }
    pagination[:total_pages] = (pagination[:count].to_f / pagination[:per_page]).ceil
    pagination[:page] = [[pagination[:page], pagination[:total_pages]].min, 1].max
    pagination
  end
end
