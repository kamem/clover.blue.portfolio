webpack and express and browser-sync starter-kit


## メインアプリケーション（Webサーバー）を起動。  
  
```
npm start
```
[http://localhost:3142/](
http://localhost:3142/)

##

### Build

ビルドのみを実行し `bundle.js` を生成する場合

```bash
npm run build:prd
```


## 設定まわり

### .editorconfig
http://editorconfig.org/

エディターのindentなどの設定を合わせる。 
各エディタに合わせてプラグインをインストールする必要があります。


## 環境まわりの説明

環境設定部分の躓いたところや、どういう構成で動いているのかを書いています。

package.jsonで使ってるライブラリについてなどかいていきます。

### 構成

#### js監視用
```
npm run start-dev
```

[http://localhost:1341/js/bundle.js](
http://localhost:1341/js/bundle.js)

このjsを``dev``環境のときだけ読み込むようにします。
下記のようにejsなどを使ってNODE_ENVの起動時の値によって切り分けています。

```
<% if (env === 'development') { %>
<script src="//localhost:1341/js/bundle.js"></script>
<% } else { %>
<script src="js/bundle.js"></script>
<% } %>
```

[webpackのHot Module ReplacementでWebフロントエンドを爆速開発](http://qiita.com/sergeant-wizard/items/60b557fc1c763f0a1531)


#### 実際のサーバー
```
start-server:prd
start-server:dev
```
[http://localhost:3141/](
http://localhost:3141/)

portは``server/settings.js``内に書いてます



#### browser-sync
```
npm run browser-sync
```

``ev/browser-sync.js``をもとに、bundle.jsに関係ないpostcssなどのファイルが更新された際に自動反映するサーバーを立てています。

``server/settings.js``内のportに ``+1``したportで実際の作業用のサーバーが立ち上がります。
実際には[http://localhost:3141/](http://localhost:3141/)の内容をproxyしています。

[http://localhost:3142/](
http://localhost:3142/)



### webpack

``webpack``で``webpack-dev-server.express.js``で
開発環境用の``bundle.js``を書きを使いリロードなしで反映されるようにしています。

```
webpack-dev-middleware
webpack-hot-middleware
```

webpack側でのho reloadの設定と合わせて.babel側にも記述しています。

#### webpack.app.config.js

```
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...
```

#### .babelrc

```
  "env": {
    "development": {
      "plugins": [
        ["react-transform",
          {
            "transforms": [
              {
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              },
              {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }
            ]
          }
        ]
      ]
    }
  }
```


``webpack-dev-server.js``と``webpack.app.config.js``で設定を行っています。

#### webpack.app.config.js

```
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...
    
    
  loaders: [
    {
      loaders: [
        'react-hot-loader',
        'babel-loader'
      ],
      
      ...
```

##### 下記参考

* [webpack, React Hot Loader + Browsersync でクロスブラウジング+ホットリロード開発](http://uraway.hatenablog.com/entry/2016/03/25/034706)

* [React Hot Loaderで開発をさらに加速する](https://blog.isao.co.jp/react-hot-loader/)

* [webpackのHot Module ReplacementでWebフロントエンドを爆速開発](http://qiita.com/sergeant-wizard/items/60b557fc1c763f0a1531)

#### webpack 3.0.0を使うにあたり
* ``OccurenceOrderPlugin``の名前が``OccurrenceOrderPlugin``に変更されてるなどの地味な変更があり注意
* ``module:{postcss: function(){}}``のようにmodule内にpostcssを描く書き方でエラーが表示される
https://github.com/postcss/postcss-loader/issues/92

下記のようにpluginsとして追加することで回避する。

```
plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        postcss: [
          require('autoprefixer'),
          require('precss')
        ]
      }
    })
]
```


#### postcss

```
npm run postcss
```

``postcss.config.js``に使いたいプラグインを記述しています。


precssを使いたいと思ったのですが、postcss-cliを使った場合に
importで読み込まれてる先のファイルを編集した際にwatchが発動しなかったため、
``postcss-import``を使うようにして個別で使いたいプラグインを読み込んでいます。


#### nodemonを使った場合のserver側のeslintについて

```
npm run start-server:dev


"NODE_ENV=development nodemon -r babel-register --watch server -e js,ejs bin/www --exec 'npm run lint:server && node'
```

``--exec 'npm run lint:server && node'``を設定することによりlintが通らないと実行されないようになっています。



##### 下記参考

* [how to do linting using nodemon?](https://stackoverflow.com/questions/34588458/how-to-do-linting-using-nodemon)
