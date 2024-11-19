import Link from "next/link";

export const Header = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mx-4 mb-4">
        <Link href="/">nasjp.dev</Link>
      </h1>

      <div className="text-center italic mb-4">
        To improve is to change; to be perfect is to change often.
      </div>

      <div className="text-center mb-4">
        {new Date().toLocaleDateString("ja-JP", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </>
  );
};
