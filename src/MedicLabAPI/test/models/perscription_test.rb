require "test_helper"

class PerscriptionTest < ActiveSupport::TestCase
test "should not save without a perscription_id" do
  perscription = Perscription.create
  assert_not perscription.save
end
test "should not save without a description" do
  perscription = Perscription.create
  assert_not perscription.save
end
test "should report error" do
  # some_undefined_variable is not defined elsewhere in the test case
    assert_raises(NameError) do
      some_undefined_variable
    end
  end
end
