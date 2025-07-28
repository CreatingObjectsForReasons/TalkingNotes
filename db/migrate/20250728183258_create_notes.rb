class CreateNotes < ActiveRecord::Migration[8.0]
  def change
    create_table :notes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
