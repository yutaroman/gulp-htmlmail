# gulp-htmlmail

htmlメールを作成するための、スターターキット

## Description

Browsersync を使用して、ローカルサーバーを立ち上げ、リアルタイムに Sass ( Scss ) のコンパイルと HTML に インラインに CSS を挿入し、画像ファイルに変更があった場合は、自動的にサーバーアップロードを行う。

![Derectory list](https://user-images.githubusercontent.com/7829877/34188116-f2eb027e-e577-11e7-963a-4974d94702bc.png)

`src` ディレクトリ内のファイルを変更することで、`dist` ディレクトリ、もしくは、`temp` ディレクトリにビルドされる。
そのため、`dist` ディレクトリがドキュメントルートとなる。`temp` ディレクトリは、コンパイルされた CSS ファイルを保存する。

## Requirement

- [node.js](https://nodejs.org/) v8.5.0
- [npm](https://www.npmjs.com/) v5.6.0

## Setting

### Node.js

_Node.js は、以下のバージョン管理ツールの使用を想定_

- Mac : [nodenv](https://github.com/nodenv/nodenv)
- Windows : [nodist](https://github.com/marcelklehr/nodist)

## Install

任意のディレクトリでローカルインストール

'$ npm install'

## Usage

### gulp の実行

- default : `$ npm run gulp`
- build : `$ npm run gulp -- build`
- watch : `$ npm run gulp -- watch`

### sftpconfig の設定

.sftpconfig を次の内容で UTF-8 で作成

 ```
 {
   "host": "",
   "user": "",
   "pass": "",
   "remotePath": ""
 }
 ```

画像の自動アップロードのタスクが必要がない場合は、.gulpfile 内に記述の `runSequence('build:image', 'upload', 'reload');` の部分を以下に変更すること。

`runSequence('build:image', 'reload');`

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[yutaroman](https://github.com/yutaroman)
