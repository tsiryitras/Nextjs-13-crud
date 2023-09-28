import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Accueil",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="">
          <Navbar />
          <div className="px-8 py-8">aaaa{children}</div>
        </div>
      </body>
    </html>
  );
}
