# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要
Next.js App Router を使用した、神秘的な目のアニメーションからプロフィール表示へのシネマティック遷移を特徴とするアーティスティックなウェブサイト。

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
  - `main-scene.tsx` - メインのシーン統合コンポーネント
  - `ui/` - shadcn/ui ベースの再利用可能なUIコンポーネント
- `src/lib/` - ユーティリティ関数（主にshadcn/ui用）
- `src/middleware.ts` - 全てのパスをルートページにリダイレクト

### 主要な技術的特徴

1. **シーン遷移システム**
   - MainSceneコンポーネントが目のアニメーションとプロフィール表示を統合管理
   - 10秒後に5秒間かけてフェード遷移（`transition: opacity 5s ease-in-out`）
   - position: absoluteによるシーン切り替え

2. **SVGベースの目のアニメーション**
   - 複雑なまばたき、浮遊、色変化アニメーション
   - レスポンシブ対応（モバイルではviewBox調整）
   - カジュアルな英語挨拶テキストのランダム表示

3. **フォント最適化**
   - Noto Serif JP with CSS variables (`--font-noto-serif-jp`)
   - `display: "swap"` と `preload: true` でパフォーマンス最適化

4. **レスポンシブ設計**
   - モバイル（<640px）での特別な角度制限（45°-135°, 225°-315°）
   - vw/vh単位とブレークポイントの併用

### 重要な実装詳細

1. **Reactキー生成**
   - SVG要素には幾何学的プロパティベースの一意キーを使用
   - 配列インデックスではなく `angle.toFixed(4)` 等を組み合わせ

2. **ミドルウェア**
   - 画像ファイルを除く全てのパスをルートにリダイレクト
   - 静的アセットとNext.js内部パスは除外

3. **状態管理**
   - useRefによるアニメーション制御（まばたき、テキスト表示）
   - requestAnimationFrameによる滑らかなアニメーション

### コーディング規約
- Biome設定に従う（2スペースインデント、ダブルクォート）
- クライアントコンポーネントには `"use client"` を明示
- React 19.0.0-rc の機能を使用可能
- SVG要素のキーは常に一意の幾何学的プロパティを使用

### 開発時の注意点
- アニメーション変更時はパフォーマンスへの影響を考慮
- モバイルでのテキスト位置は角度制限を考慮
- コミット前に必ず `npm run lint` を実行