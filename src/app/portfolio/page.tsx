import { PortfolioCard } from "@/components/PortofolioCard";

const portfolioItems = [
  {
    service: "SESAi",
    client: "NoConcept",
    role: "Full Product Developer",
    link: "COMING SOON...",
    description:
      "システムエンジニアリングサービスを自動化するサービス「SESAi」の開発において、プロダクトマネジメント、要件整理、デザイン、開発を全て担当しました。",
    image: "/about/sesai.png",
  },
  {
    service: "Nannda",
    client: "Nannda",
    role: "Tech Lead & Blockchain Engineer",
    link: "https://www.nannda.xyz",
    description:
      "「Nannda」というイーサリアムを基盤としたNFTプロジェクトにおいて、テックリードおよびブロックチェーンエンジニアとして、バックエンドAPIやスマートコントラクトの実装を全て担当しました。このプロジェクトは既にサービスを終了しましたが、多くのユーザーに「NFTによるPlay-to-Earn」の体験を提供することができました。",
    image: "/about/nannda.png",
  },
  {
    service: "Liquid Shield",
    client: "ELEMENTS",
    role: "Engineer",
    link: "https://liquidinc.asia/2024-03-19/",
    description:
      "「LIQUID Shield」は業界横断型の顔画像を活用した不正検知サービスで、本人確認データをもとに虚偽の疑いがある申請を検知することを目的としています。このプロジェクトにおいて、私はバックエンドエンジニアとして開発を担当し、技術選定から、システム設計から実装、サービスローンチ、運用までを経験しました。",
    image: "/about/liquid-shield.webp",
  },
  {
    service: "Liquid EKYC",
    client: "ELEMENTS",
    role: "Engineer",
    link: "https://liquidinc.asia/liquid-ekyc/",
    description:
      "AI審査で本人確認業務を自動化するサービス「Liquid EKYC」の開発において、バックエンドエンジニアとして、サービスローンチから機能開発、運用までを経験しました。eKYC市場におけるベンダー別売上金額シェアで5年連続No.1を獲得しています。",
    image: "/about/liquid-ekyc.png",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-4 pt-8">ポートフォリオ</h2>
      <div className="space-y-4">
        {portfolioItems.map((item) => (
          <PortfolioCard key={item.service} {...item} />
        ))}
      </div>
    </>
  );
}
