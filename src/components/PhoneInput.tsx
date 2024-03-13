import React from 'react';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';

interface PhoneInputProps {
  value?: string;
  fullWidth?: boolean;
  error?: boolean,
  helperText?: React.ReactNode;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, fullWidth, error, helperText }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = event.target.value.replace(/\D/g, '');
    onChange(cleanedValue);
  };

  // alert(value)

  return (
    <InputMask
      mask="+7 (999) 999-9999"
      value={value}
      onChange={handleChange}
      // placeholder="+7 (___) ___-____"
      maskChar="_"
    >
      {/* @ts-ignore */}
      {(inputProps: any) => {
        return (
          <TextField
            {...inputProps}
            label='Номер телефона'
            variant="standard"
            error={error}
            type="tel"
            helperText={helperText}
            fullWidth={fullWidth}
             />
        );
      }}
    </InputMask>
  );
};

export default PhoneInput;
