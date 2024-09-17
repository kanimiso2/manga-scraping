class CreateSessions < ActiveRecord::Migration[7.0]
  def change
    create_table :sessions do |t|
      t.string :session_token, null: false, unique: true
      t.references :user, null: false, foreign_key: true
      t.datetime :expires_at, null: false
      t.timestamps
    end
    add_index :sessions, :session_token, unique: true
  end
end
