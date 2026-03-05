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
      <div className="contents">{children}</div>
      <Footer />
    </>
  );
}
