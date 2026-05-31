# obsidian-lazy-embed

- [English](#obsidian-lazy-embed-1)
  - [Features](#features)
  - [Supported Services](#supported-services)
  - [Usage](#usage)
  - [Settings](#settings)
  - [Development](#development)
  - [Installation](#installation)
  - [License](#license)
- [日本語](#obsidian-lazy-embed日本語)
  - [機能](#機能)
  - [対応サービス](#対応サービス)
  - [使い方](#使い方)
  - [設定](#設定)
  - [開発](#開発)
  - [インストール](#インストール)
  - [ライセンス](#ライセンス)

---

# obsidian-lazy-embed

An [Obsidian](https://obsidian.md) plugin that converts `![](<url>)` image syntax into embedded iframes at render time.

## Features

- Converts image-link syntax to service-specific iframes on preview render
- Spotify track/album/playlist embed support (built-in)
- Extensible architecture — easy to add new services
- Per-service enable/disable toggle in plugin settings

## Supported Services

| Service | Status |
|---------|--------|
| Spotify | Planned |

## Usage

Paste a supported URL using Obsidian's image syntax in your note:

```markdown
![](https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh)
```

In Reading/Preview mode, the plugin renders it as an embedded player instead of a broken image.

## Settings

Each supported service can be individually enabled or disabled via **Settings → obsidian-lazy-embed**.

## Development

This plugin is developed with TDD. Run tests with:

```bash
npm test
```

### Adding a new service

1. Implement the `EmbedProvider` interface
2. Register the provider in `src/providers/index.ts`
3. A settings toggle is automatically generated

## Installation

> Not yet available on the community plugin directory.

### Via BRAT (recommended)

[BRAT](https://github.com/TfTHacker/obsidian42-brat) lets you install and auto-update beta plugins directly from GitHub.

1. Install and enable the [BRAT plugin](https://obsidian.md/plugins?id=obsidian42-brat)
2. Open **Settings → BRAT → Add Beta plugin**
3. Enter `no-la/obsidian-lazy-embed`
4. Enable the plugin in **Settings → Community plugins**

### Manual

1. Download the latest release
2. Copy `main.js` and `manifest.json` to `.obsidian/plugins/obsidian-lazy-embed/`
3. Enable the plugin in **Settings → Community plugins**

## License

MIT

---

# obsidian-lazy-embed（日本語）

`![](<url>)` 形式で書かれた URL を、プレビュー表示時に自動的に iframe 埋め込みに変換する Obsidian プラグインです。

## 機能

- `![]()` 記法の URL をサービス固有の埋め込みプレイヤーに変換
- Spotify（トラック・アルバム・プレイリスト）対応（予定）
- 拡張しやすいアーキテクチャ — 新サービスの追加が容易
- 設定画面でサービスごとに有効/無効を切り替え可能

## 対応サービス

| サービス | ステータス |
|---------|--------|
| Spotify | 予定 |

## 使い方

ノートに対応サービスの URL を画像記法で貼り付けます:

```markdown
![](https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh)
```

閲覧モード（Reading View）では、壊れた画像の代わりに埋め込みプレイヤーとして表示されます。

## 設定

**設定 → obsidian-lazy-embed** から、サービスごとに個別で有効/無効を切り替えられます。

## 開発

TDD で開発しています。テストの実行:

```bash
npm test
```

### 新サービスの追加

1. `EmbedProvider` インターフェースを実装する
2. `src/providers/index.ts` にプロバイダーを登録する
3. 設定画面のトグルは自動的に生成されます

## インストール

> コミュニティプラグインディレクトリにはまだ公開されていません。

### BRAT を使う（推奨）

[BRAT](https://github.com/TfTHacker/obsidian42-brat) を使うと、GitHub から直接ベータプラグインをインストール・自動更新できます。

1. [BRAT プラグイン](https://obsidian.md/plugins?id=obsidian42-brat) をインストールして有効化
2. **設定 → BRAT → Add Beta plugin** を開く
3. `no-la/obsidian-lazy-embed` を入力
4. **設定 → コミュニティプラグイン** でプラグインを有効化

### 手動インストール

1. 最新リリースをダウンロード
2. `main.js` と `manifest.json` を `.obsidian/plugins/obsidian-lazy-embed/` にコピー
3. **設定 → コミュニティプラグイン** でプラグインを有効化

## ライセンス

MIT
