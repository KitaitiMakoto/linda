Linda
=====

開発
----

`public`ディレクトリー以下のHTMLやCSSなんかが公開されます。それ以外のディレクトリーのファイルは（このREADMEのように）見えないので好きなの置けます。

`master`ブランチにコミットしてGitHubにプッシュすると、自動でHerokuにデプロイ（リリース）されます。`master`以外のブランチはデプロイされないので、作りかけのうちは別ブランチでやって、OKになったら`master`にマージするといいでしょう（GitHubのプルリクエスト機能がお勧めです）。

CSS
----

Polymerを使うためには、ターミナルで

    $ ./node_modules/.bin/bower install

というコマンドを実行する必要があります。が、下のSetup手順を全部踏んでおけば自動で行われます。

その他の自分で追加するCSSについては、`public/scss`ディレクトリーに、拡張子「`.css.scss`」で作成します。最後が`.scss`担っているところから分かるように、[SCSS][1]（に、便利なあれこれを足した[Compass][2]）で書きます。SCSSをもっと便利にした書き方で書けますが、CSSそのままの書き方でも大丈夫なので、始めは気にせず書いて、徐々に覚えていくといいでしょう。

[1]: http://sass-lang.com/guide
[2]: http://compass-style.org/

Setup
-----

1. bundle install --path=vendor/bundle
2. npm install
3. ./node_modules/.bin/hookin Gemfile.lock "bundle install"
4. ./node_modules/.bin/hookin package.json "npm install && npm prune"

Run server on local
-------------------

1. bundle exec foreman start
