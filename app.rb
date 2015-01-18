require 'sinatra'
require 'pathname'

HOST = 'linda-tokyo.herokuapp.com'
DOC_ROOT = Pathname(__dir__) + 'public'

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
  if request.host == HOST and request.scheme != 'https'
    uri = URI(request.url)
    uri.scheme = 'https'
    redirect uri
    return
  end

  path = DOC_ROOT + unescape(request.path).chomp('/')
  if path.file?
    path.read
  elsif File.directory? path
    '<ul><li>' <<
      Dir.glob(File.join(path, '*')).map {|e| e.sub("#{path}/", '')}.join('</li><li>') <<
      '</li></ul>'
  else
    404
  end
end
