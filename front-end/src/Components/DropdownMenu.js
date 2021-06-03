import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

export default function DropdownMenu({
  promt,
  options,
  value,
  id,
  label,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  function close(event) {
    setOpen(event && event.target === ref.current);
  }

  return (
    <div className="dropdown">
      <div className="control" onClick={() => setOpen((prev) => !prev)}>
        <div className="selected-value" ref={ref}>
          {value ? value[label] : promt}
        </div>
        <div className={`arrow ${open ? "open" : null}`} />
      </div>
      <div className={`options ${open ? "open" : null}`}>
        {options.map((option) => (
          <div
            key={option[id]}
            className={`option ${value === option ? "selected" : null}`}
            onClick={() => {
              onChange(option);
              setOpen(false); // automatically close dropdown
            }}
          >
            {option[label]}
          </div>
        ))}
      </div>
    </div>
  );
}
