# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120326231509) do

  create_table "connections", :force => true do |t|
    t.string   "linkid"
    t.integer  "user_id"
    t.string   "picurl"
    t.string   "name"
    t.string   "title"
    t.string   "location"
    t.string   "linkurl"
    t.string   "status"
    t.string   "tags"
    t.string   "priority"
    t.string   "parent_id"
    t.string   "last_contacted"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
  end

  add_index "connections", ["user_id", "created_at"], :name => "index_connections_on_user_id_and_created_at"

  create_table "notes", :force => true do |t|
    t.string   "content"
    t.integer  "user_id"
    t.integer  "connection_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "notes", ["user_id", "connection_id", "created_at"], :name => "index_notes_on_user_id_and_connection_id_and_created_at"

  create_table "profiles", :force => true do |t|
    t.string   "linkid"
    t.integer  "user_id"
    t.string   "picurl"
    t.string   "name"
    t.string   "title"
    t.string   "location"
    t.string   "linkurl"
    t.integer  "xp"
    t.integer  "credits"
    t.integer  "awards"
    t.integer  "links"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "profiles", ["user_id"], :name => "index_profiles_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "username"
    t.string   "email"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "password_digest"
    t.string   "remember_token"
    t.string   "oauth_token"
    t.string   "oauth_secret"
    t.string   "linkid"
    t.string   "google_oauth"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["google_oauth"], :name => "index_users_on_google_oauth"
  add_index "users", ["oauth_token"], :name => "index_users_on_oauth_token"
  add_index "users", ["remember_token"], :name => "index_users_on_remember_token"

end
