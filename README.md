Linda
=====

開発
----

`public`ディレクトリー以下のHTMLやCSSなんかが公開されます。それ以外のディレクトリーのファイルは（このREADMEのように）見えないので好きなの置けます。

`master`ブランチにコミットしてGitHubにプッシュすると、自動でHerokuにデプロイ（リリース）されます。`master`以外のブランチはデプロイされないので、作りかけのうちは別ブランチでやって、OKになったら`master`にマージするといいでしょう（GitHubのプルリクエスト機能がお勧めです）。

Setup
-----

1. bundle install --path=vendor/bundle
2. npm install
3. ./node_modules/.bin/hookin Gemfile.lock "bundle install"
4. ./node_modules/.bin/hookin package.json "npm install && npm prune"

Run server on local
-------------------

1. bundle exec foreman start
