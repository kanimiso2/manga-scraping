class ChangeProviderAccountIdNullOnAccounts < ActiveRecord::Migration[7.0]
  def change
    change_column_null :accounts, :provider_account_id, true
  end
end
