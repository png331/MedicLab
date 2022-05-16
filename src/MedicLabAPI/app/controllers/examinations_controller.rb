class ExaminationsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_examination, only: %i[ show update destroy ]
  before_action :allow_admins_doctors_only, except: [ :index ]


  # GET /examinations
  def index
    @user = set_user
    @examinations = @user.examinations

    render :json => @examinations.to_json(:include => { perscription: { :include => {perscription_drugs: { :include => :drug}}}})
  end

  # GET /examinations/1
  def show
    render json: @examination
  end

  # POST /examinations
  def create
    @user = set_user
    @examination = @user.examinations.build(examination_params)

    if @examination.save
      render json: @examination, status: :created
    else
      render json: @examination.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /examinations/1
  def update
    if @examination.update(examination_params)
      render json: @examination
    else
      render json: @examination.errors, status: :unprocessable_entity
    end
  end

  # DELETE /examinations/1
  def destroy
    @examination.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_examination
      @examination = Examination.find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end
    
    # Only allow a list of trusted parameters through.
    def examination_params
      params.require(:examination).permit(:weightKg, :heightCm, :anamnesis, :user_id)
    end
end
