import { ReactNode } from "react";
import { Lora } from "next/font/google";
import styles from "./Layout.module.scss";
import { Header } from "../header";
import { Footer } from "../footer";

const { layoutMainContainer } = styles;

const tenorS = Lora({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={tenorS.className}>
      <Header />
      <div className={layoutMainContainer}>{children}</div>
      <Footer />
    </div>
  );
};
