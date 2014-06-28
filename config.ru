require 'sprockets'
require 'compass'
require 'sprockets-sass'

environment = Sprockets::Environment.new
environment.append_path 'public/scss'

map '/css' do
  run environment
end

map '/' do
  run Rack::Directory.new('public')
end
