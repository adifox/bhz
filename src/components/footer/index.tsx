import { IconBrandX, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const {
  mainWrapper,
  containerStyles,
  socialIcons,
  containerWrapperStyles,
  footerTitle,
  linkItemStyles,
  linkingSectionStyles,
  copyrightStyles,
} = styles;

export const Footer = () => {
  return (
    <footer className={mainWrapper}>
      <div className={containerWrapperStyles}>
        <p className={footerTitle}>Buenos Humos Zaragoza</p>
        <div className={containerStyles}>
          <div className={linkingSectionStyles}>
            <h4>Nuestros Amigos</h4>
            <ul>
              <li className={linkItemStyles}>
                <Link href="https://www.cigarsmokerclub.com">
                  Cigar Smoker Club
                </Link>
              </li>
            </ul>
          </div>
          <div className={socialIcons}>
            <h4>Síguenos en nuestras redes sociales</h4>
            <ul>
              <li>
                <Link href="https://www.instagram.com/buenoshumoszaragoza">
                  <IconBrandInstagram size={48} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className={copyrightStyles}>
          Copyright ©2024 Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
};
