import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function ChromeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="min-h-dvh md:pt-24">{children}</div>
      <Footer />
    </>
  );
}
