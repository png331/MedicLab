class Examination < ApplicationRecord
    belongs_to :user
    has_one :perscription, :dependent => :destroy
    validates :weightKg, :heightCm, :anamnesis, presence: true

    accepts_nested_attributes_for :perscription, allow_destroy: true
end
