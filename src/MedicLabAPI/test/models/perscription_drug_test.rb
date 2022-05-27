require "test_helper"

class PerscriptionDrugTest_drugs < ActiveSupport::TestCase
  test "should not save without a perscription_id_drugs" do
    perscription_drugs = PerscriptionDrug.create
    assert_not perscription_drugs.save
  end
  test "should not save without a drug_id" do
    perscription_drugs = PerscriptionDrug.create
    assert_not perscription_drugs.save
  end
  test "should not save without a usageDescription" do
    perscription_drugs = PerscriptionDrug.create
    assert_not perscription_drugs.save
  end
  test "should report error" do
    # some_undefined_variable is not defined elsewhere in the test case
      assert_raises(NameError) do
        some_undefined_variable
      end
    end
end
