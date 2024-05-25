import Link from "next/link";
import { IconBrandInstagram } from "@tabler/icons-react";
import styles from "./MobileMenu.module.scss";

const { openedStyles, closedStyles, linkStyles, socialIconsWrapper } = styles;

interface MobileMenuProps {
  open: boolean;
  toggleMenu: () => void;
}

export const MobileMenu = ({ open, toggleMenu }: MobileMenuProps) => {
  return (
    <div className={open ? openedStyles : closedStyles}>
      <ul>
        <li onClick={toggleMenu}>
          <Link href="/" className={linkStyles}>
            <span>Inicio</span>
          </Link>
        </li>
        <li onClick={toggleMenu}>
          <Link href="/sobrenosotros" className={linkStyles}>
            <span>Sobre nosotros</span>
          </Link>
        </li>
        <li onClick={toggleMenu}>
          <Link href="/club" className={linkStyles}>
            <span>Únete al Club</span>
          </Link>
        </li>
      </ul>
      <div className={socialIconsWrapper}>
        <ul>
          <li onClick={toggleMenu}>
            <Link
              href="https://www.instagram.com/buenoshumoszaragoza"
              className={linkStyles}
            >
              <IconBrandInstagram size={28} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
