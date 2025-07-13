# Statement of Work (SOW) Phase 2 - nasjp.dev 追加最適化プロジェクト

## 1. プロジェクト概要

### 1.1 目的
前回の最適化でBest Practicesスコアが100点に改善されました。本フェーズでは、残るSEOスコアの改善とさらなるパフォーマンス最適化を実施します。

### 1.2 背景
2025年7月13日実施の最新Lighthouse監査により、以下の状態を確認：
- SEOスコアがまだ92/100（robots.txt問題が未解決）
- レンダリングブロックCSSによる180msの遅延
- CSS/JSの未使用コードが50%残存

## 2. 現状分析

### 2.1 Lighthouseスコア（2025年7月13日デプロイ後）
| カテゴリ | スコア | 前回からの変化 | 状態 |
|---------|-------|---------------|------|
| Performance | 99/100 | → 維持 | ✅ 優秀 |
| Accessibility | 100/100 | → 維持 | ✅ 完璧 |
| Best Practices | 100/100 | ↑ +4点 | ✅ 完璧達成！ |
| SEO | 92/100 | → 未改善 | ⚠️ 要対応 |

### 2.2 残存する技術的課題
1. **robots.txt アクセス問題**
   - 症状: /robots.txtにアクセスするとHTMLが返される
   - 原因: ミドルウェアがrobots.txtをルートにリダイレクトしている可能性

2. **レンダリングブロックCSS**
   - 2つのCSSファイル（合計37KB）が180msの遅延を引き起こしている
   - Critical CSSのインライン化が不完全

3. **未使用コード**
   - Tailwind CSSの未使用クラスが残存（50%）
   - JavaScriptバンドルに未使用コードが含まれている

4. **Speed Index**
   - 1.2秒（目標: 1.0秒以下）

## 3. 作業範囲

### 3.1 Phase 2-1: robots.txt問題の完全解決（最優先）
- [ ] ミドルウェアの修正（robots.txtを除外）
- [ ] robots.tsの動作確認とデバッグ
- [ ] 本番環境での動作検証

### 3.2 Phase 2-2: CSS最適化の強化
- [ ] Critical CSSの完全なインライン化
- [ ] Tailwind CSSのPurge設定最適化
- [ ] CSSの分割と遅延読み込み実装

### 3.3 Phase 2-3: JavaScript最適化の強化
- [ ] 動的インポートによるコード分割
- [ ] 不要な依存関係の追加削除
- [ ] バンドル分析とサイズ削減

### 3.4 Phase 2-4: Speed Index改善
- [ ] フォント読み込み最適化
- [ ] 画像の遅延読み込み実装
- [ ] アニメーションの最適化

## 4. 成果物

### 4.1 実装成果物
1. **修正されたmiddleware.ts**
   - robots.txtを正しく除外
   - パフォーマンスへの影響を最小化

2. **最適化されたCSS戦略**
   - インラインCritical CSS
   - Purge済みTailwind CSS（使用クラスのみ）
   - 非同期CSS読み込み

3. **最適化されたJavaScript**
   - コード分割されたバンドル
   - 動的インポートの実装
   - 削減されたFirst Load JS

4. **パフォーマンス改善**
   - Speed Index < 1.0秒
   - FCP < 0.3秒
   - LCP < 0.5秒

### 4.2 ドキュメント成果物
1. バンドル分析レポート
2. パフォーマンス改善の詳細データ
3. 本番環境での検証結果

## 5. タイムライン

| フェーズ | 作業内容 | 所要時間 | 優先度 |
|---------|---------|---------|--------|
| Phase 2-1 | robots.txt問題解決 | 20分 | 🔴 最高 |
| Phase 2-2 | CSS最適化強化 | 45分 | 🟡 高 |
| Phase 2-3 | JS最適化強化 | 60分 | 🟡 高 |
| Phase 2-4 | Speed Index改善 | 30分 | 🟢 中 |
| 検証 | 本番環境テスト | 15分 | 🔴 最高 |

**合計所要時間**: 約2.5時間

## 6. 期待される成果

### 6.1 定量的成果
- SEOスコア: 92 → 100（+8点）
- Speed Index: 1.2秒 → 1.0秒以下（-20%）
- First Load JS: 100KB → 80KB以下（-20%）
- レンダリングブロック時間: 180ms → 0ms

### 6.2 定性的成果
- 完全な100点スコアの達成（全カテゴリ）
- 初期表示速度の体感的向上
- SEOランキングの潜在的改善

## 7. 技術仕様

### 7.1 ミドルウェア修正
```typescript
// robots.txt, sitemap.xml, その他の静的ファイルを除外
const excludedPaths = ['/robots.txt', '/sitemap.xml', '/_next', '/api'];
```

### 7.2 CSS最適化
```typescript
// Critical CSSをlayout.tsxにインライン化
<style dangerouslySetInnerHTML={{ __html: criticalCSS }} />

// 非Critical CSSを遅延読み込み
<link rel="preload" href="/styles.css" as="style" />
<link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'" />
```

### 7.3 動的インポート
```typescript
// 重いコンポーネントの動的インポート
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>,
});
```

## 8. リスクと対策

| リスク | 影響度 | 対策 |
|--------|-------|------|
| ミドルウェア修正による予期しない影響 | 高 | 段階的デプロイとロールバック準備 |
| CSS最適化による表示崩れ | 中 | ビジュアルリグレッションテスト |
| 過度な最適化による保守性低下 | 低 | コード品質とパフォーマンスのバランス |

## 9. 成功基準
- 全Lighthouseカテゴリで100点を達成
- robots.txtが正しいコンテンツを返す
- Speed Index 1.0秒以下
- ビジュアルリグレッションゼロ

## 10. 次のステップ
1. robots.txt問題の即時修正（最優先）
2. CSS/JS最適化の段階的実装
3. 各段階での本番環境検証

作成日: 2025年7月13日