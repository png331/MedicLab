class ApplicationController < ActionController::API
    # before_action :configure_permitted_parameters, if: :devise_controller?



    # protected
    
    # def configure_permitted_parameters
    #     devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :first_name, :last_name, :dob, :address, :password, :password_confirmation, :role_id])
    # end
    def is_admin?
        current_user.role.name == "Admin"
    end
    
    def unauthorized_action
        render json: {
            status: 401,
            message: "Unauthorized user!"
            }, status: :unauthorized
    end

    def allow_admins_only
        if !is_admin?
            unauthorized_action
        end
    end
end
