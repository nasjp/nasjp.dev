# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
Next.js App Router を使用した、神秘的な目のアニメーションを中心としたアーティスティックなウェブサイト。

## 開発コマンド

### 基本コマンド
```bash
npm run dev       # 開発サーバー起動 (http://localhost:3000)
npm run build     # プロダクションビルド
npm run start     # プロダクションサーバー起動
npm run lint      # Biomeによるlintチェックと自動修正
npm run format    # Biomeによるコードフォーマット
```

### コード品質チェック
開発中は必ず以下のコマンドを実行してコード品質を確保すること：
```bash
npm run lint      # コミット前に必ず実行
```

## アーキテクチャとコード構造

### ディレクトリ構造
- `src/app/` - Next.js App Router のページとレイアウト
- `src/components/` - Reactコンポーネント
  - `mystical-eye.tsx` - メインのアニメーションコンポーネント
  - `ui/` - shadcn/ui ベースの再利用可能なUIコンポーネント
- `src/lib/` - ユーティリティ関数（主にshadcn/ui用）

### 主要な技術的特徴
1. **アニメーション実装**
   - SVGベースの複雑なアニメーション（mystical-eye.tsx）
   - CSS変数とTailwindアニメーションの組み合わせ
   - まばたきやスクロールテキストなどの演出

2. **スタイリング規約**
   - Tailwind CSSのユーティリティクラスを優先使用
   - カスタムCSSは `globals.css` で定義
   - shadcn/ui のコンポーネントシステムに準拠

3. **TypeScript設定**
   - パスエイリアス: `@/*` は `./src/*` にマップ
   - 厳格モード有効

### コーディング規約
- Biome設定に従う（2スペースインデント、ダブルクォート）
- クライアントコンポーネントには `"use client"` を明示
- React 19.0.0-rc の機能を使用可能

### 開発時の注意点
- 新しいshadcn/uiコンポーネント追加時は `components.json` の設定に従う
- アニメーション変更時はパフォーマンスへの影響を考慮
- コミット前に必ず `npm run lint` を実行