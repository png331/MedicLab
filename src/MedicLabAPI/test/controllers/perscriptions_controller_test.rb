require "test_helper"

class PerscriptionsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @perscription = perscriptions(:one)
  end

  test "should get index" do
    get perscriptions_url, as: :json
    assert_response :success
  end

  test "should create perscription" do
    assert_difference("Perscription.count") do
      post perscriptions_url, params: { perscription: { Description: @perscription.Description } }, as: :json
    end

    assert_response :created
  end

  test "should show perscription" do
    get perscription_url(@perscription), as: :json
    assert_response :success
  end

  test "should update perscription" do
    patch perscription_url(@perscription), params: { perscription: { Description: @perscription.Description } }, as: :json
    assert_response :success
  end

  test "should destroy perscription" do
    assert_difference("Perscription.count", -1) do
      delete perscription_url(@perscription), as: :json
    end

    assert_response :no_content
  end
end
