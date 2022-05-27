require "test_helper"

class ExaminationTest < ActiveSupport::TestCase
  test "should not save without a user_id" do
      examination = Examination.create
      assert_not examination.save
    end
  test "should not save without a weightKg" do
    examination = Examination.create
    assert_not examination.save
  end
  test "should not save without a heightCm" do
    examination = Examination.create
    assert_not examination.save
  end
  test "should not save without a anamnesis" do
    examination = Examination.create
    assert_not examination.save
  end
  test "should report error" do
    # some_undefined_variable is not defined elsewhere in the test case
    assert_raises(NameError) do
      some_undefined_variable
    end
  end
end
