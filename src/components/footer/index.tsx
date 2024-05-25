import { IconBrandX, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";
import styles from "./Footer.module.scss";

const { mainWrapper, containerStyles, socialIcons } = styles;

export const Footer = () => {
  return (
    <footer className={mainWrapper}>
      <div className={containerStyles}>
        <div className={socialIcons}>
          <ul>
            <li>
              <Link href="https://www.instagram.com/buenoshumoszaragoza">
                <IconBrandInstagram size={48} />
              </Link>
            </li>
          </ul>
        </div>
        <p>Copyright ©2024 Todos los derechos reservados</p>
        {/* <p>Términos y condiciones / Política de privacidad</p> */}
      </div>
    </footer>
  );
};
