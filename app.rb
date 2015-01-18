require 'sinatra'
require 'pathname'

HOST = 'linda-tokyo.herokuapp.com'
DOC_ROOT = Pathname(__dir__) + 'public'

before do
  if request.host == HOST and request.scheme != 'https'
    uri = URI(request.url)
    uri.scheme = 'https'
    redirect uri
    halt
  end
end

error 404 do
  'Not Found'
end

get '/' do
  path = DOC_ROOT + 'app.html'
  if path.exist?
    path.read
  else
    (DOC_ROOT + 'app.src.html').read
  end
end

get '/*' do
  path = DOC_ROOT + unescape(request.path).chomp('/')
  if path.file?
    path.read
  else
    404
  end
end
