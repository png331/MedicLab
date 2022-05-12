require "test_helper"

class ExaminationsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @examination = examinations(:one)
  end

  test "should get index" do
    get examinations_url, as: :json
    assert_response :success
  end

  test "should create examination" do
    assert_difference("Examination.count") do
      post examinations_url, params: { examination: { anamnesis: @examination.anamnesis, heightCm: @examination.heightCm, weightKg: @examination.weightKg } }, as: :json
    end

    assert_response :created
  end

  test "should show examination" do
    get examination_url(@examination), as: :json
    assert_response :success
  end

  test "should update examination" do
    patch examination_url(@examination), params: { examination: { anamnesis: @examination.anamnesis, heightCm: @examination.heightCm, weightKg: @examination.weightKg } }, as: :json
    assert_response :success
  end

  test "should destroy examination" do
    assert_difference("Examination.count", -1) do
      delete examination_url(@examination), as: :json
    end

    assert_response :no_content
  end
end
