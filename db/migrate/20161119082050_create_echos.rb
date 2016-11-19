class CreateEchos < ActiveRecord::Migration[5.0]
  def change
    create_table :echos do |t|
      t.datetime :response_at

      t.timestamps
    end
  end
end
