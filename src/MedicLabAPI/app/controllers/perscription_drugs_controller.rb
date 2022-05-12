class PerscriptionDrugsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_perscription_drug, only: %i[ show update destroy ]

  # GET /perscription_drugs
  def index
    @perscription_drugs = PerscriptionDrug.all

    render json: @perscription_drugs
  end

  # GET /perscription_drugs/1
  def show
    render json: get_perscription
  end

  # POST /perscription_drugs
  def create
    @perscription = get_perscription
    @drug = Drug.all
    @perscription_drug = @perscription.perscription_drugs.build(perscription_drug_params)

    if @perscription_drug.save
      render json: @perscription_drug, status: :created
    else
      render json: @perscription_drug.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /perscription_drugs/1
  def update
    if @perscription_drug.update(perscription_drug_params)
      render json: @perscription_drug
    else
      render json: @perscription_drug.errors, status: :unprocessable_entity
    end
  end

  # DELETE /perscription_drugs/1
  def destroy
    @perscription_drug.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.

    def get_perscription
      @perscription = Perscription.find(params[:perscription_id])
    end

    def set_perscription_drug
      @perscription_drug = PerscriptionDrug.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def perscription_drug_params
      params.require(:perscription_drug).permit(:drug_id, :perscription_id, :usageDescription)
    end
end
