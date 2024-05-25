import { useState } from "react";
import { IconBrandInstagram, IconMenu } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "../ui-components/mobile-menu";
import styles from "./Header.module.scss";

const {
  navBarContainer,
  mainWrapper,
  contentWrapper,
  logoWrapper,
  navBar,
  navigationWrapper,
  linkStyles,
  socialIcons,
  logoBackground,
  companyNameStyles,
  mobileMenuIconWrapper,
} = styles;

export const Header = () => {
  const [openState, setOpenState] = useState(false);
  const handleMobileMenuClick = () => {
    setOpenState(!openState);
  };

  return (
    <div className={navBarContainer}>
      <div className={mainWrapper}>
        <div className={contentWrapper}>
          <div className={socialIcons}>
            <ul>
              <li>
                <Link
                  href="https://www.instagram.com/buenoshumoszaragoza"
                  className={linkStyles}
                >
                  <IconBrandInstagram size={28} />
                </Link>
              </li>
            </ul>
          </div>
          <div className={logoWrapper}>
            <Link href="/" className={linkStyles}>
              <div className={logoBackground}>
                <Image
                  src={"/Images/bhz-web-logo.png"}
                  alt="Compico logo"
                  fill
                />
              </div>
              {/* <p className={companyNameStyles}>Buenos Humos Zaragoza</p> */}
            </Link>
          </div>
          <nav className={navBar}>
            <ul>
              <li>
                <Link href="/sobrenosotros" className={linkStyles}>
                  <span>Sobre nosotros</span>
                </Link>
              </li>
              <li>
                <Link href="/club" className={linkStyles}>
                  <span>Únete al club</span>
                </Link>
              </li>
            </ul>
          </nav>
          <div
            className={mobileMenuIconWrapper}
            onClick={handleMobileMenuClick}
          >
            <IconMenu size={28} />
          </div>
        </div>
      </div>
      <MobileMenu
        open={openState}
        toggleMenu={() => setOpenState(!openState)}
      />
    </div>
  );
};
