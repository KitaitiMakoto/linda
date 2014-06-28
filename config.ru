require 'sprockets'
require 'compass'
require 'sprockets-sass'

Compass.add_project_configuration(File.join(File.dirname(__FILE__), 'config', 'compass.rb'))

environment = Sprockets::Environment.new
environment.append_path 'public/scss'

map '/css' do
  run environment
end

map '/' do
  run Rack::Directory.new('public')
end
