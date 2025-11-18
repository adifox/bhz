import React, { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Users.module.scss";

interface Member {
  id: string;
  name?: string;
  email?: string;
  membershipNumber?: string;
  phone?: string;
  [key: string]: any;
}

export default function Users() {
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>("");
  const [codeError, setCodeError] = useState<string>("");
  const [verifying, setVerifying] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const verifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setVerifying(true);
    setCodeError("");

    try {
      const response = await fetch("/api/verifyadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: accessCode }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        setIsVerified(true);
        setCodeError("");
      } else {
        setCodeError(data.message || "Código inválido");
      }
    } catch (err) {
      setCodeError("Error al conectar con el servidor");
      console.error("Error verifying code:", err);
    } finally {
      setVerifying(false);
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/getmembers?code=${encodeURIComponent(accessCode)}`
      );
      const data = await response.json();

      if (response.ok) {
        setMembers(data.members || []);
      } else {
        setError(data.message || "Error al obtener los miembros");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Miembros - Buenos Humos Zaragoza</title>
        <meta name="description" content="Lista de miembros registrados" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
      </Head>
      <div
        className={`${styles.container} ${
          !isVerified ? styles.containerCentered : ""
        }`}
      >
        {!isVerified ? (
          <div className={styles.codeVerification}>
            <div className={styles.codeCard}>
              <h1 className={styles.title}>Acceso Administrativo</h1>
              <form onSubmit={verifyCode} className={styles.codeForm}>
                <div className={styles.codeInputGroup}>
                  <input
                    type="text"
                    value={accessCode}
                    onChange={(e) => {
                      setAccessCode(e.target.value);
                      setCodeError("");
                    }}
                    placeholder="Introduce el código de acceso"
                    className={styles.codeInput}
                    autoFocus
                    disabled={verifying}
                  />
                </div>
                {codeError && (
                  <div className={styles.errorMessage}>{codeError}</div>
                )}
                <button
                  type="submit"
                  disabled={verifying || !accessCode.trim()}
                  className={styles.verifyButton}
                >
                  {verifying ? "Verificando..." : "Verificar Código"}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <h1 className={styles.title}>Miembros Registrados</h1>
              <button
                onClick={fetchMembers}
                disabled={loading}
                className={styles.fetchButton}
              >
                {loading ? "Cargando..." : "Obtener Miembros"}
              </button>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            {members.length > 0 && (
              <div className={styles.membersList}>
                <div className={styles.listHeader}>
                  <span className={styles.count}>
                    Total: {members.length}{" "}
                    {members.length === 1 ? "miembro" : "miembros"}
                  </span>
                </div>
                <div className={styles.membersGrid}>
                  {members.map((member) => (
                    <div key={member.id} className={styles.memberCard}>
                      <div className={styles.memberHeader}>
                        <h3 className={styles.memberName}>
                          {member.name || "Sin nombre"}
                        </h3>
                        {member.membershipNumber && (
                          <span className={styles.membershipNumber}>
                            #{member.membershipNumber}
                          </span>
                        )}
                      </div>
                      <div className={styles.memberDetails}>
                        {member.email && (
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>Email:</span>
                            <span className={styles.detailValue}>
                              {member.email}
                            </span>
                          </div>
                        )}
                        {member.phone && (
                          <div className={styles.detailItem}>
                            <span className={styles.detailLabel}>
                              Teléfono:
                            </span>
                            <span className={styles.detailValue}>
                              {member.phone}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {members.length === 0 && !loading && !error && (
              <div className={styles.emptyState}>
                <p>Haz clic en el botón para obtener la lista de miembros</p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
