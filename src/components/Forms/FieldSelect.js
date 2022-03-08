import React, { useEffect, useState } from "react";
import { useField } from "@formiz/core";
import formStyles from "../../styles/form.module.css";

export const FieldSelect = (props) => {
  const { errorMessage, id, isValid, isSubmitted, resetKey, setValue, value } =
    useField(props);
  const { label, required, name, placeholder, options = [] } = props;
  const [isTouched, setIsTouched] = useState(false);
  const showError = !isValid && (isTouched || isSubmitted);

  useEffect(() => {
    setIsTouched(false);
  }, [resetKey]);

  return (
    <div className={formStyles["select"]}>
      <select
        id={id}
        value={value || ""}
        onBlur={() => setIsTouched(true)}
        aria-invalid={showError}
        aria-describedby={!isValid ? `${id}-error` : undefined}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      >
        {(options || []).map((item) => (
          <option key={item.value} value={item.value}>
            {item.label || item.value}
          </option>
        ))}
      </select>
    </div>
  );
};
