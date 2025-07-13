import dynamic from "next/dynamic";

const MainScene = dynamic(() => import("../components/main-scene"), {
  loading: () => <div className="h-dvh bg-white" />,
  ssr: true,
});

export default function Page() {
  return <MainScene />;
}
