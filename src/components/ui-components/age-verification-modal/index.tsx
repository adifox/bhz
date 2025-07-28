import React, { useState, useEffect } from "react";
import { CustomDropdown } from "@/components/ui-components";
import styles from "./AgeVerificationModal.module.scss";

interface AgeVerificationModalProps {
  onAgeVerified: () => void;
}

export const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({
  onAgeVerified,
}) => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
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

  // Prevent body scrolling when modal is visible
  useEffect(() => {
    if (isVisible) {
      // Store the current scroll position
      const scrollY = window.scrollY;

      // Add styles to prevent scrolling
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      // Cleanup function to restore scrolling
      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [isVisible]);

  // Generate arrays for dropdowns
  const days = Array.from({ length: 31 }, (_, i) => ({
    id: i + 1,
    value: (i + 1).toString().padStart(2, "0"),
    label: (i + 1).toString().padStart(2, "0"),
  }));

  const months = [
    { id: 1, value: "01", label: "Enero" },
    { id: 2, value: "02", label: "Febrero" },
    { id: 3, value: "03", label: "Marzo" },
    { id: 4, value: "04", label: "Abril" },
    { id: 5, value: "05", label: "Mayo" },
    { id: 6, value: "06", label: "Junio" },
    { id: 7, value: "07", label: "Julio" },
    { id: 8, value: "08", label: "Agosto" },
    { id: 9, value: "09", label: "Septiembre" },
    { id: 10, value: "10", label: "Octubre" },
    { id: 11, value: "11", label: "Noviembre" },
    { id: 12, value: "12", label: "Diciembre" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => ({
    id: currentYear - i,
    value: (currentYear - i).toString(),
    label: (currentYear - i).toString(),
  }));

  const calculateAge = (day: string, month: string, year: string): number => {
    const birthDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDay || !selectedMonth || !selectedYear) {
      setError("Por favor, completa todos los campos");
      return;
    }

    const age = calculateAge(selectedDay, selectedMonth, selectedYear);

    if (age < 0) {
      setError("La fecha de nacimiento no puede ser en el futuro");
      return;
    }

    if (age >= 18) {
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
            <div className={styles.dateInputs}>
              <CustomDropdown
                options={days}
                value={selectedDay}
                onChange={(option) => {
                  setSelectedDay(option.value);
                  setError("");
                }}
                placeholder="Día"
                className={styles.dateSelect}
              />
              <CustomDropdown
                options={months}
                value={selectedMonth}
                onChange={(option) => {
                  setSelectedMonth(option.value);
                  setError("");
                }}
                placeholder="Mes"
                className={styles.dateSelect}
              />
              <CustomDropdown
                options={years}
                value={selectedYear}
                onChange={(option) => {
                  setSelectedYear(option.value);
                  setError("");
                }}
                placeholder="Año"
                className={styles.dateSelect}
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
