class PerscriptionDrug < ApplicationRecord
    belongs_to :perscription
    belongs_to :drug
    validates :usageDescription, presence: true
end
