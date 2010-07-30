class CreatePurchases < ActiveRecord::Migration
  def self.up
    create_table :purchases do |t|
      t.string :name
      t.integer :price
      t.date :purchased_on
      t.timestamps
    end
  end

  def self.down
    drop_table :purchases
  end
end
