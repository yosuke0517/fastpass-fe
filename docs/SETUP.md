## 前提
- Dockerがインストールされていること
- Dockerが起動していること

## 1. passone-ui インストールのためのPersonal Access Token (Classic) の発行
[Creating a personal access token - GitHub Docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) に従い、以下の権限を持つ PAT を発行してください。

- [x] read:packages

PAT を発行したら、 shell の設定ファイル .zshrc などにトークンの値を環境変数 NPM_AUTH_TOKEN として export する記述を追加します。

```bash
// ~/.zshrc に以下の記述を追加
export NPM_AUTH_TOKEN=<YOUR_GITHUB_PAT>

// 設定を反映
source ~/.zshrc
```

## 2. htpps化
```bash
// インストール
brew install mkcert

// ルートCAの生成とインストール
mkcert -install
> Sudo password:

mkdir .docker/nginx/cert
mkcert -cert-file .docker/nginx/cert/localhost.pem -key-file .docker/nginx/cert/localhost-key.pem localhost
```

## 3. セットアップ

```bash
docker network create --subnet=172.31.0.0/16 pia-pass-web
```

```bash
docker-compose up -d
```

```bash
docker-compose exec fe yarn
```

## 4. husky

```bash
yarn postinstall
```
.gitを書き換える必要があるためコンテナじゃなくてローカルで実行

## 5. 起動
```bash
docker-compose exec fe yarn dev
```

```bash
open https://localhost:3443
```

## 6. ローカルでのpassone-uiとの連携
- passone-ui のコンポーネント開発とpiapass-webの画面を同時に開発するシーンを想定
- passone-ui にdev用のビルドコマンドを用意しているため実行
```bash
// passone-ui
yarn build:dev 
```

- piapass-webのpackage.jsonをローカルへ向ける（/distとしないとnode_modulesなどもinstallされるのでめちゃ重い）

```json
"dependencies": {
    "@hoge/passone-ui": "../hoge-ui/dist",
}
```

- 再インストール
```bash
docker-compose exec fe yarn
```

## 7. Node.js

- package.jsonの `engines` , `.node-version` にバージョンを指定しているので、Node.jsのバージョンを合わせる
- nodenvなどのバージョン管理ツールを使ってバージョンを合わせる
