import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { IAvailableValue } from '@/models/AvailableValue';
import { Box } from '@mui/material';
import ProjectDataService from '@/services/ProjectDataService';

interface ProjectSelectProps {
  customLabel?: string;
  defaultValue?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  onChange: (value?: IAvailableValue | null) => void;
}

const ProjectSelect: React.FC<ProjectSelectProps> = ({ customLabel, error, helperText, defaultValue, onChange }) => {
  const [values, setValues] = useState<IAvailableValue[]>([]);
  const [currentValue, setCurrentValue] = useState<IAvailableValue | null>(null);

  useEffect(() => {
    fetchValues();
  }, []);

  const fetchValues = () => {
    ProjectDataService.getAvailableValues()
      .then(response => {
        setValues(response.data);
      })
      .catch(error => {
        console.error(`Error fetching values:`, error);
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
          label={customLabel ?? 'Проект'}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default ProjectSelect;
