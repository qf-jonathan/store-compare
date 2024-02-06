import { useState, type KeyboardEvent } from "react";
import { CheckIcon, CloseIcon } from "./icons";

interface FieldEditProps {
  value: string;
  onSave: (newValue: string) => void;
  onCancel: () => void;
}

export const FieldEdit = ({value, onSave, onCancel}: FieldEditProps) => {
  const [newValue, setNewValue] = useState(value);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      onSave(newValue);
    }
    if(event.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <>
      <input
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus={true}
      />
      <button
        onClick={() => onSave(newValue)}
        className="success"
        aria-label="save"
      >
        <CheckIcon />
      </button>
      <button
        onClick={() => onCancel()}
        className="alert"
        aria-label="cancel"
      >
        <CloseIcon />
      </button>
    </>
  );
};
