class DrugsController < ApplicationController
    before_action :allow_admins_doctors_only

    def index
        @drugs = Drug.all
        render json: @drugs
    end
end