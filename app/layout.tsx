import Navbar from "@/components/Navbar";
import "./globals.css";
import { store } from "./stores/stores";
import { Provider } from "react-redux";
import { Providers } from "./stores/provider";

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
          <div className="px-8 py-8">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
