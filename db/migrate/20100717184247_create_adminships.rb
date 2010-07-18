class CreateAdminships < ActiveRecord::Migration
  def self.up
    create_table :adminships do |t|
      t.date :date
      t.float :hours
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :adminships
  end
end
