require "test_helper"

class PerscriptionDrugsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @perscription_drug = perscription_drugs(:one)
  end

  test "should get index" do
    get perscription_drugs_url, as: :json
    assert_response :success
  end

  test "should create perscription_drug" do
    assert_difference("PerscriptionDrug.count") do
      post perscription_drugs_url, params: { perscription_drug: { usageDescription: @perscription_drug.usageDescription } }, as: :json
    end

    assert_response :created
  end

  test "should show perscription_drug" do
    get perscription_drug_url(@perscription_drug), as: :json
    assert_response :success
  end

  test "should update perscription_drug" do
    patch perscription_drug_url(@perscription_drug), params: { perscription_drug: { usageDescription: @perscription_drug.usageDescription } }, as: :json
    assert_response :success
  end

  test "should destroy perscription_drug" do
    assert_difference("PerscriptionDrug.count", -1) do
      delete perscription_drug_url(@perscription_drug), as: :json
    end

    assert_response :no_content
  end
end
