import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Stack } from '@mui/material';
import { IUpdateWorkingTimeDto, IWorkingTimeInfoDto } from '@/models/WorkingTimeModels';
import WorkingTimeDataService from '@/services/WorkingTimeDataService';
import * as MuiIcon from "@mui/icons-material";
import { IAvailableValue } from '@/models/AvailableValue';
import ProjectSelect from '../ProjectSelect';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ruRU } from '@mui/x-date-pickers/locales';
import ruLocale from "date-fns/locale/ru";

interface EditWorkingTimeDialogProps {
  open: boolean;
  onClose: () => void;
  workingTime: IWorkingTimeInfoDto | null;
  onRefresh: () => void;
}

const EditWorkingTimeDialog: React.FC<EditWorkingTimeDialogProps> = ({ open, onClose, workingTime, onRefresh }) => {
  const [formData, setFormData] = useState<IUpdateWorkingTimeDto | null>(workingTime);

  useEffect(() => {
    setFormData(workingTime);
  }, [workingTime]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => prevData ? { ...prevData, [name]: value } : null);
  };

  const handleProjectChange = (value?: IAvailableValue | null) => {
    setFormData(prevData => prevData ? {
      ...prevData,
      projectId: value?.value !== null ? value?.value : undefined,
    } : null);
  }

  const handleSubmit = async () => {
    if (formData) {
      try {
        await WorkingTimeDataService.updateWorkingTime(formData.id, formData);
        onRefresh();
        handleClose();
      } catch (error) {
        console.error('Error updating working time:', error);
      }
    }
  };

  const handleClose = () => {
    setFormData(null);
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'md'}>
      <DialogTitle>Редактировать отчет
        <IconButton
          aria-label="close"
          onClick={onClose}
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
              onChange={(value) => setFormData(prevData => prevData ? { ...prevData, reportDate: value?.toISOString() } : null)}
            />
          </LocalizationProvider>

          <ProjectSelect
            customLabel='Проект'
            onChange={handleProjectChange}
            defaultValue={formData?.projectId}
          />
        </Stack>

        <TextField
          name="time"
          label="Затраченное время"
          type="number"
          value={formData?.time || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Описание"
          multiline
          minRows={3}
          value={formData?.description || ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Сохранить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditWorkingTimeDialog;
