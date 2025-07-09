import React, { useState, useEffect } from "react";
import styles from "./AgeVerificationModal.module.scss";

interface AgeVerificationModalProps {
  onAgeVerified: () => void;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  onAgeVerified,
}) => {
  const [age, setAge] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already verified their age
    const hasVerified = localStorage.getItem("ageVerified");
    if (!hasVerified) {
      setIsVisible(true);
    } else {
      onAgeVerified();
    }
  }, [onAgeVerified]);

  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age);

    if (isNaN(ageNum) || ageNum < 0) {
      setError("Por favor, introduce una edad válida");
      return;
    }

    if (ageNum >= 18) {
      localStorage.setItem("ageVerified", "true");
      setIsVisible(false);
      onAgeVerified();
    } else {
      setError("Debes tener al menos 18 años para acceder a este sitio");
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Verificación de Edad</h2>
        </div>
        <div className={styles.modalBody}>
          <p>Para acceder a Buenos Humos Zaragoza, debes ser mayor de edad.</p>
          <form onSubmit={handleAgeSubmit} className={styles.ageForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="age">¿Cuál es tu edad?</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError("");
                }}
                placeholder="Introduce tu edad"
                min="0"
                max="120"
                className={styles.ageInput}
                autoFocus
              />
            </div>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <button type="submit" className={styles.verifyButton}>
              Verificar Edad
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
