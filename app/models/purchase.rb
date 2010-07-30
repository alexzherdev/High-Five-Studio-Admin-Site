class Purchase < ActiveRecord::Base
  named_scope :planned, :conditions => { :bought_on => nil }
  named_scope :completed, :conditions => "bought_on is not null"
end
