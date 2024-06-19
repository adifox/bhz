interface ButtonProps {
  buttonText: string;
}

export const Button = ({ buttonText }: ButtonProps) => {
  return <button>{buttonText}</button>;
};
