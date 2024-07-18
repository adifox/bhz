import { SyntheticEvent, useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import styles from "../styles/Club.module.scss";

const {
  mainWrapperStyles,
  outlineWrapper,
  subheaderStyles,
  contentWrapperStyles,
  formWrapper,
  formSection,
  imageWrapperStyles,
  imageStyles,
  selectInputSection,
  surnameInputSection,
  inputFieldsSection,
  linkStyles,
  ctaButtonWrapper,
} = styles;

const days = [...Array(31).keys()].map((x) => ++x);

const startYear = 1904;
const endYear = 2024;
const yearsArray: number[] = [];

for (let year = startYear; year <= endYear; year++) {
  yearsArray.push(year);
}

const monthsArray = [
  "Enero",
  "Febrero",
  "Marzo",
  "April",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

interface DefaultValueProps {
  day: number;
  month: string;
  year: number;
  name: string;
  surname: string;
  secondSurname: string;
  dni: string;
  city: string;
  email: string;
  password: string;
}

const defaultValues: DefaultValueProps = {
  day: 1,
  month: "Enero",
  year: 1904,
  name: "",
  surname: "",
  secondSurname: "",
  dni: "",
  city: "",
  email: "",
  password: "",
};

export default function Page() {
  const [value, setValue] = useState(defaultValues);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [userName, setUserName] = useState("a Buenos Humos Zaragoza");
  const [formError, setFormError] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  type T = HTMLInputElement | HTMLSelectElement;

  const handleChange = (event: ChangeEvent<T>) => {
    if (formError) {
      setFormError(false);
    }

    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = (data: DefaultValueProps) => {
    const currentYear = new Date().getFullYear();

    if (currentYear - data.year < 18) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    setDisableButton(true);
    if (!validateForm(value)) {
      event.preventDefault();
      setDisableButton(false);
      setFormError(true);
      return;
    }

    event.preventDefault();
    setUserName(value.name);
    const response = await axios.post("/api/registermember", value);

    if (response.status === 200) {
      setRegisterSuccess(true);
      setValue(defaultValues);
      window.scrollTo(0, 0);
    }

    if (response.status > 200) {
      setRegisterError(true);
    }
  };

  return (
    <>
      <Head>
        <title>Buenos Humos Zaragoza</title>
        <meta
          name="description"
          content="Club de fumadores Buenos Humos Zaragoza"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta
          property="og:title"
          content="Buenos Humos Zaragoza es un club de fumadores de tabacos premium"
        />
        <meta property="og:image" content="/Images/bhz-web-logo.png" />
        <meta property="og:image:alt" content="Buenos Humos Zaragoza" />
        <meta property="twitter:image" content="Images/bhz-web-logo.png" />
        <meta property="twitter:image:alt" content="Buenos Humos Zaragoza" />
        <meta
          property="og:description"
          content="Club de fumadores Buenos Humos Zaragoza"
        />
        <meta content="index,follow" name="robots" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={mainWrapperStyles}>
        <div className={outlineWrapper}>
          <h2>{`Bienvenid@ ${userName}`}</h2>
          {!registerSuccess && (
            <h3 className={subheaderStyles}>
              Aquí puedes formar parte del Club.
            </h3>
          )}
          <div className={contentWrapperStyles}>
            <div className={imageWrapperStyles}>
              <Image
                src={"/Images/buenos-humos-zaragoza.png"}
                alt="cigarros placencia"
                className={imageStyles}
                fill
                priority
              />
            </div>
            <div className={formWrapper}>
              {!registerSuccess ? (
                <form onSubmit={handleSubmit} className={formSection}>
                  <div className={selectInputSection}>
                    <span>
                      <select
                        value={value.day}
                        onChange={handleChange}
                        name="day"
                      >
                        {days.map((day, index) => (
                          <option key={index} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </span>
                    <span>
                      <select
                        value={value.month}
                        onChange={handleChange}
                        name="month"
                      >
                        {monthsArray.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                    </span>
                    <span>
                      <select
                        value={value.year}
                        onChange={handleChange}
                        name="year"
                      >
                        {yearsArray.map((year, index) => (
                          <option key={index} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                  <h3 style={formError ? { color: "red" } : {}}>
                    Para unirte al Club, necesitamos verificar que tienes más de
                    18 años.
                  </h3>
                  <input
                    type="text"
                    name="name"
                    value={value.name}
                    placeholder="Nombre"
                    onChange={handleChange}
                    required
                  />
                  <div className={surnameInputSection}>
                    <input
                      type="text"
                      name="surname"
                      value={value.surname}
                      placeholder="Primer apellido"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="secondSurname"
                      value={value.secondSurname}
                      placeholder="Segundo apellido"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className={inputFieldsSection}>
                    <input
                      type="text"
                      name="dni"
                      value={value.dni}
                      placeholder="DNI/NIE"
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="city"
                      value={value.city}
                      placeholder="Ciudad"
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={value.email}
                      placeholder="Email"
                      onChange={handleChange}
                      required
                    />
                    {/* <input
                    type="password"
                    name="password"
                    value={value.password}
                    placeholder="Contraseña"
                    onChange={handleChange}
                  /> */}
                  </div>
                  <button disabled={disableButton} type="submit">
                    Adelante
                  </button>
                </form>
              ) : registerSuccess && !registerError ? (
                <div>
                  <p>
                    Muchas gracias por registrarte. Recibirás un email de
                    confirmación junto con tu número de membresía.
                  </p>
                  <div className={ctaButtonWrapper}>
                    <Link href="/blog" className={linkStyles}>
                      <span>Últimas Novedades</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    Vaya, algo ha salido mal. Por favor intentalo más tarde otra
                    vez.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
