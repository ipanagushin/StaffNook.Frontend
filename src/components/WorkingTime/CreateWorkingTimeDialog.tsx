import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Stack } from '@mui/material';
import { ICreateWorkingTimeDto } from '@/models/WorkingTimeModels';
import WorkingTimeDataService from '@/services/WorkingTimeDataService';
import * as MuiIcon from "@mui/icons-material";
import { IAvailableValue } from '@/models/AvailableValue';
import ProjectSelect from '../ProjectSelect';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ruRU } from '@mui/x-date-pickers/locales';
import ruLocale from "date-fns/locale/ru";

interface WorkingTimeDialogProps {
  open: boolean;
  onClose: () => void;
}

const CreateWorkingTimeDialog: React.FC<WorkingTimeDialogProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState<ICreateWorkingTimeDto>({
    projectId: '',
    time: undefined,
    description: '',
    reportDate: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleProjectChange = (value?: IAvailableValue | null) => {
    setFormData(prevData => ({
      ...prevData,
      projectId: value?.value !== null ? value?.value : undefined,
    }));
  }

  const handleSubmit = async () => {
    try {
      await WorkingTimeDataService.createWorkingTime(formData);
      handleClose();
    } catch (error) {
      console.error('Error creating working time:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      projectId: '',
      time: undefined,
      description: '',
      reportDate: '',
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
      <DialogTitle>Добавить отчет
        <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <MuiIcon.Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} paddingTop={2}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale} localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
                    <DatePicker 
                      label="Дата"
                      value={formData?.reportDate ? new Date(formData?.reportDate) : null}
                      onChange={(value)=> setFormData({ ...formData, reportDate: value?.toISOString() })}
                      />
        </LocalizationProvider>

          <ProjectSelect
              customLabel='Проект'
              onChange={handleProjectChange}
          />
        </Stack>

          <TextField
            name="time"
            label="Затраченное время"
            type="number"
            value={formData.time}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="description"
            label="Описание"
            multiline
            minRows={3}
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Создать</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateWorkingTimeDialog;
