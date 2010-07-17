# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  helper :all

  filter_parameter_logging :password, :password_confirmation
  helper_method :current_user, :authorized?
  
  before_filter :login_required

  protected
  
  def authorized?(controller_path = self.class.controller_path, action_name = params[:action])
    not current_user.blank?
  end
  
  def login_required
    authorized? || access_denied
  end
  
  def access_denied
    if current_user 
      render :template => "/errors/403" 
    else
      if request.xhr?
        render :update do |page|
          page.redirect_to login_url
        end
      else
        redirect_to login_url
      end
    end
  end
  
  def rescue_action_in_public(exception)
    status_code = response_code_for_rescue(exception)
    if status_code == :not_found
      render :template => "errors/404", :layout => false 
    else
      @exception = exception
      @show_backtrace = Rails.env == "development"
      render :template => "errors/500"
    end    
  end
  
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    @current_user = current_user_session && current_user_session.user
  end
end
