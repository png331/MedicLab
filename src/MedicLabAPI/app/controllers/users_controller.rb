class UsersController < ApplicationController
    before_action :allow_admins_doctors_only

    def index
        @users = User.where(role_id: Role.find_by(name: "Patient").id)
        render json: @users
    end
end