# Mail Header Analyzer

ローカル環境で安全に動作する、電子メールヘッダー解析用のデスクトップアプリケーションです。

## 概要

`mail-header-analyzer`は、ITサポート担当者や情報セキュリティアナリストが、オンラインツールに機密情報をアップロードするリスクを冒すことなく、メールヘッダーを迅速に視覚化・分析するために開発されました。専門知識が必要で読みにくいヘッダー情報を、クリーンで分かりやすいインターフェースに表示します。

## ✨ 主な機能

* **安全なローカル解析**: 入力されたヘッダー情報は外部に送信されることなく、すべてローカルマシン上で処理されます。
* **基本情報の表示**: ヘッダーから「件名」「From」「To」「Date」を自動で抽出し、一目で確認できます。
* **配送経路の可視化**: 全ての`Received:`ヘッダーを時系列に沿って表示し、各中継点（ホップ）間の遅延時間を計算して色付きのバッジで表示します。
    * **緑**: 1秒未満の遅延
    * **黄**: 1秒以上5秒未満の遅延
    * **赤**: 5秒以上の遅延

## 🛠️ 技術スタック

* **フレームワーク**: [Electron](https://www.electronjs.org/)
* **UI**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
* **UIコンポーネント**: [shadcn/ui](https://ui.shadcn.com/)
* **スタイリング**: [Tailwind CSS](https://tailwindcss.com/)

## 🚀 使い方（開発者向け）

### 前提条件

* [Node.js](https://nodejs.org/) (v18以降を推奨)
* npm (Node.jsに同梱)

### 1. プロジェクトのセットアップ

リポジトリをクローンし、必要なパッケージをインストールします。

```bash
git clone [https://github.com/あなたのユーザー名/mail-header-analyzer.git](https://github.com/あなたのユーザー名/mail-header-analyzer.git)
cd mail-header-analyzer
npm install
```

### 2. 開発モードでの実行

以下のコマンドを実行すると、アプリケーションが開発モードで起動します。ソースコードの変更はリアルタイムで反映されます。

```bash
npm run dev
```

### 3. アプリケーションのビルド

Windows向けの実行可能ファイル（`.exe`）を作成するには、以下のコマンドを実行します。

```bash
npm run dist
```

ビルドが完了すると、`release`または`dist`フォルダ内にパッケージ化されたアプリケーションが生成されます。