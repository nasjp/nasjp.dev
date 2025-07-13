import dynamic from "next/dynamic";

const MainScene = dynamic(() => import("../components/main-scene"), {
  loading: () => <div style={{ height: "100dvh", backgroundColor: "white" }} />,
  ssr: true,
});

export default function Page() {
  return <MainScene />;
}
