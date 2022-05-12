class Examination < ApplicationRecord
    belongs_to :user
    has_one :perscription, :dependent => :destroy
    validates :weightKg, :heightCm, :anamnesis, presence: true

end
