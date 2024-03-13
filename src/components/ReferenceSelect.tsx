import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { IAvailableValue } from '@/models/AvailableValue';
import { ReferenceType } from '@/common/ReferenceType';
import ReferenceDataService from '@/services/ReferenceDataService';
import { Box } from '@mui/material';

interface ReferenceSelectProps {
  customLabel?: string;
  defaultValue?: string;
  referenceType: ReferenceType;
  error?: boolean;
  helperText?: React.ReactNode;
  onChange: (value?: IAvailableValue | null) => void;
}

const ReferenceSelect: React.FC<ReferenceSelectProps> = ({ customLabel, referenceType, error, helperText, defaultValue, onChange }) => {
  const [values, setValues] = useState<IAvailableValue[]>([]);
  const [currentValue, setCurrentValue] = useState<IAvailableValue | null>(null);

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = () => {
    ReferenceDataService.getByType(referenceType)
      .then(response => {
        setValues(response.data);
      })
      .catch(error => {
        console.error(`Error fetching ${referenceType} values:`, error);
      });
  };

  const handleValueChange = (value?: IAvailableValue | null) => {
    onChange(value);
    setCurrentValue(value ?? null);
  };

  return (
    <Autocomplete
      options={values}
      value={defaultValue && values.find(v => v.value === defaultValue) || currentValue}
      getOptionLabel={option => option.name}
      onChange={(_, value) => handleValueChange(value)}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
            {option.name}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={customLabel ?? referenceType}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default ReferenceSelect;
