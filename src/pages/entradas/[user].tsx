import Users from "./users.json";
import styles from "./Tickets.module.scss";

const { container, header, content } = styles;

function Entradas({ user }: { user: string }) {
  const userData = Users.users.find((u) => u.id === user);

  return (
    <div className={container}>
      <div className={header}>
        <h1>Entradas</h1>
      </div>
      <div className={content}>
        {userData ? (
          <>
            <h2>Bienvenid@</h2>
            <h3>{userData.name}</h3>
          </>
        ) : (
          <h2>Usuario no encontrado</h2>
        )}
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
