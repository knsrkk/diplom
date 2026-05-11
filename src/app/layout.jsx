import { Lato, Russo_One } from "next/font/google";
import Header from "./modules/header/header";
import Footer from "./modules/footer/footer";
import "./globals.css";

const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const russoOne = Russo_One({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-russo-one",
});
export const metadata = {
  title: "Перевоз.OFF",
  description: "Сервис для организации грузоперевозок",
  keywords: "грузоперевозки, транспорт, логистика, доставка",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preload" href="/hero.png" as="image" />
      </head>
      <body
        className={`${lato.variable} ${russoOne.variable} antialiased bg-background`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
