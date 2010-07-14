# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_highfive_session',
  :secret      => 'bfec77929bc0cb51233baba0270b4e26db5f28ae844ec335874ce283ae6cb73fac3a37b72b08f57a6434b2f2c638c71f28bd04ad9498f5dc0bf79255d67eacec'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
