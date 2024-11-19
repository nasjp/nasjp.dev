import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-12 text-center space-y-4 border-t pt-4">
      <div>
        <Link href="#" className="hover:underline">
          Copyright {new Date().getFullYear()} nasjp.dev
        </Link>
      </div>
    </footer>
  );
};
