# sample-app

https://sakura-ichro.github.io/sample-app/

## 前提

``` bash
$ node -v
8.11.4
```

## セットアップ

``` bash
# 依存パッケージインストール
$ yarn install
```

## 主なコマンド

``` bash
# 開発用サーバの起動
$ yarn dev

# 静的ビルド
$ yarn gen

# 公開
$ yarn deploy
```

開発用サーバはPort3333で起動します   
重複している場合はnuxt.configから設定してください   
詳しくはpackage.jsonを参照
