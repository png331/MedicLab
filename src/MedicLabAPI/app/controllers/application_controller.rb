class ApplicationController < ActionController::API
    
    def is_admin?
        current_user.role.name == "Admin"
    end

    def is_doctor?
        current_user.role.name == "Doctor"
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

    def allow_admins_doctors_only
        if !is_admin? && !is_doctor?
            unauthorized_action
        end
    end
end
