class PerscriptionsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_perscription, only: %i[ show update destroy ]

  # GET /perscriptions
  def index
    @examination = get_examination
    @perscriptions = examination.perscriptions

    render json: @perscriptions
  end

  # GET /perscriptions/1
  def show
    render json: @perscription

  end

  # POST /perscriptions
  def create
    @perscription = get_examination.build_perscription(perscription_params)

    if @perscription.save
      render json: @perscription, status: :created
    else
      render json: @perscription.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /perscriptions/1
  def update
    if @perscription.update(perscription_params)
      render json: @perscription
    else
      render json: @perscription.errors, status: :unprocessable_entity
    end
  end

  # DELETE /perscriptions/1
  def destroy
    @perscription.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def get_examination
      @examination = Examination.find(params[:examination_id])
    end

    def set_perscription
      @perscription = Perscription.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def perscription_params
      params.require(:perscription).permit(:examination_id, :description)
    end
end
