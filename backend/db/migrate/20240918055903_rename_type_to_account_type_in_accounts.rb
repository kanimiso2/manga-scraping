class RenameTypeToAccountTypeInAccounts < ActiveRecord::Migration[7.0]
  def change
    rename_column :accounts, :type, :account_type
  end
end
