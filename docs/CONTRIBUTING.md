# コントリビューションガイド

## 1. 開発粒度とPRの出し方

- 1PR 1機能 で 400行を超える場合はタスクを分割しレビューコストが上がらないようにする

## 2. ディレクトリ設計

### コロケーションパターン

#### コロケーションパターンとは
本プロジェクトでは子ロケーションパターンを以下のように定義します
> そのドメインに関連するスタイル、テンプレート、ロジックを同じディレクトリに配置する

本プロジェクトでは関連するファイルを_colocationディレクトリに格納しルーティングが無視されるように設定しています。

```bash
.
└── plan
    ├── _colocation // ここにplanに関連するファイルを格納
    │         ├── components
    │         │         ├── XXContainer.tsx
    │         │         └── __tests__
    │         ├── config
    │         │         └── const.ts
    │         ├── utils
    │         │         ├── XXUtil.ts
    │         │         └── __tests__
    │         └── hooks
    │             └── usePlanList.ts
    └── page.tsx
```


## 2. フェッチング・キャッシュ・状態管理
- ※ dehydrate の部分は現状まだ揺れている状態。今後変更があるかもしれない

### 2 - 1. フェッチ
- フェッチは Next.js 組み込みの [fetch](https://nextjs.org/docs/app/api-reference/functions/fetch) を使用する
- フェッチは app router の 恩恵を受けるために Server Components で行う

### 2 - 2. キャッシュ
- キャッシュは next.js の[組み込みキャッシュ](https://nextjs.org/docs/app/building-your-application/caching)を使用する

### 2 - 3. 状態管理
- 必要に応じて導入する
