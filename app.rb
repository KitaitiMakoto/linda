require 'sinatra'

HOST = 'linda-tokyo.herokuapp.com'
DOC_ROOT = File.join(__dir__, 'public')

error 404 do
  'Not Found'
end

get '/*' do
  if request.host == HOST and request.scheme != 'https'
    uri = URI(request.url)
    uri.scheme = 'https'
    redirect uri
    return
  end

  path = File.join(DOC_ROOT, unescape(request.path).chomp('/'))
  if File.file? path
    path.read
  elsif File.directory? path
    '<ul><li>' <<
      Dir.glob(File.join(path, '*')).map {|e| e.sub("#{path}/", '')}.join('</li><li>') <<
      '</li></ul>'
  else
    404
  end
end
