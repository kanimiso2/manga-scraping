class CreateVerificationTokens < ActiveRecord::Migration[7.0]
  def change
    create_table :verification_tokens do |t|
      t.string :identifier, null: false
      t.string :token, null: false
      t.datetime :expires_at, null: false

      t.timestamps
    end

    add_index :verification_tokens, :token, unique: true
  end
end
