import styles from "./Tickets.module.scss";

const { container, header, content } = styles;

function Entradas({ user }: { user: string }) {
  const removeMiddleDashAndUppercaseFirstLetter = (name: string) => {
    return name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const userName = removeMiddleDashAndUppercaseFirstLetter(user);

  return (
    <div className={container}>
      <div className={header}>
        <h1>Entradas</h1>
      </div>
      <div className={content}>
        <h2>Bienvenid@</h2>
        <h3>{userName}</h3>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { user: string };
}) => {
  const { user } = params;
  return {
    props: { user },
  };
};

export default Entradas;
