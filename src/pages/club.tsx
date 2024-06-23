import { SyntheticEvent, useState, ChangeEvent } from "react";
import Image from "next/image";
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

const defaultValues = {
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

  type T = HTMLInputElement | HTMLSelectElement;

  const handleChange = (event: ChangeEvent<T>) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault();
    setValue(defaultValues);
  };

  return (
    <div className={mainWrapperStyles}>
      <div className={outlineWrapper}>
        <h2>Bienvenid@ a Buenos Humos Zaragoza</h2>
        <h3 className={subheaderStyles}>Aquí puedes formar parte del Club.</h3>
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
            <form onSubmit={handleSubmit} className={formSection}>
              <div className={selectInputSection}>
                <span>
                  <select value={value.day} onChange={handleChange} name="day">
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
              <h3>
                Para unirte al Club, necesitamos verificar que tienes más de 18
                años.
              </h3>
              <input
                type="text"
                name="name"
                value={value.name}
                placeholder="Nombre"
                onChange={handleChange}
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
                />
              </div>
              <div className={inputFieldsSection}>
                <input
                  type="text"
                  name="dni"
                  value={value.dni}
                  placeholder="DNI/NIE"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="city"
                  value={value.city}
                  placeholder="Ciudad"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  value={value.email}
                  placeholder="Email"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  value={value.password}
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
              </div>
              <button type="submit">SAVE</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
