class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :type, null: false
      t.string :provider, null: false
      t.string :provider_account_id, null: false
      t.string :refresh_token
      t.string :access_token
      t.datetime :expires_at
      t.string :token_type
      t.string :scope
      t.string :id_token
      t.string :session_state  
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :accounts, [:provider, :provider_account_id], unique: true
  end
end
