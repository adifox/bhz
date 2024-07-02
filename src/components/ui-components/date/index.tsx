import styles from "./Date.module.scss";

const { mainWrapper } = styles;

function convertToEuropeanDate(dateTimeString: string) {
  const datePart = dateTimeString.split(" ")[0];
  // Split the input date string by the hyphen
  const parts = datePart.split("-");

  // Ensure the input is valid
  if (parts.length !== 3) {
    throw new Error("Invalid date format");
  }

  // Extract year, month, and day from the split parts
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];

  // Return the date in DD/MM/YYYY format
  return `${day}/${month}/${year}`;
}

export const Date = ({ dateStr }: { dateStr: string }) => {
  return (
    <div className={mainWrapper}>
      <p>{convertToEuropeanDate(dateStr)}</p>
    </div>
  );
};
