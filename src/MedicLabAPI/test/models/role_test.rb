require "test_helper"

class RoleTest < ActiveSupport::TestCase
  test "should not save without a name" do
    role = Role.index
    assert_not role.index
  end
  test "should not save without a description" do
    role = Role.index
    assert_not role.index
  end
end
