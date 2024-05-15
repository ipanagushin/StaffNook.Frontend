import React, { useState, useEffect, useRef } from 'react';
import { Button, Grid, Typography, IconButton, Dialog, Box, Stack, DialogTitle, Divider, Container } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReportModalContent from '@/components/WorkingTime/ReportModalContent';
import WorkingTimeDataService from '@/services/WorkingTimeDataService';
import { IProductionCalendarModel, IWorkingTimeInfoDto } from '@/models/WorkingTimeModels';
import * as MuiIcon from "@mui/icons-material";
import { blue } from '@mui/material/colors';

interface CalendarProps {
  // todo
}

const Calendar: React.FC<CalendarProps> = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showReportModal, setShowReportModal] = useState(false); 
  const [calendarData, setCalendarData] = useState<IProductionCalendarModel[]>([]);
  const [reportsData, setReportsData] = useState<IWorkingTimeInfoDto[]>([]);
  const currentDateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCalendarData();
  }, [currentDate]);

  useEffect(() => {
    if (currentDateRef.current) {
      currentDateRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline:'nearest' });
    }
  })

  const fetchCalendarData = async () => {
    const from = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
    const to = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString();

    try {
      const response = await WorkingTimeDataService.getCalendarByDates(from, to);
      setCalendarData(response.data.calendar);
      setReportsData(response.data.reports);
    } catch (error) {
      console.error('Error fetching calendar data:', error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  const handleDayClick = (dayOfMonth: number) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfMonth));
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
  };

  const calculateHoursForDay = (date: string): number => {
    const reportsForDay = reportsData.filter(report => report.reportDate === date);
    return reportsForDay.reduce((totalHours, report) => totalHours + report.time, 0);
  };

  const getReportsForCurrentDay = (date: Date): IWorkingTimeInfoDto[] => {
    const formattedDate = date.toISOString().split('T')[0];
    return reportsData.filter(report => report.reportDate.split('T')[0] === formattedDate);
  };

  return (
    <Container maxWidth={'xl'} sx={{pt: 2, userSelect:'none'}}>
      <Grid container alignItems="center" justifyContent="space-between" style={{ marginBottom: '16px' }}>
        <Grid item>
          <IconButton onClick={handlePrevMonth}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {currentDate.toLocaleString('ru-RU', { month: 'long' })} {currentDate.getFullYear()}
          </Typography>
        </Grid>
        <Grid item>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Stack style={{ overflowX: 'auto', whiteSpace: 'nowrap' }} direction="row">
      {calendarData.map((day) => {
        const dayDate = new Date(day.date);
        const dayOfMonth = dayDate.getDate();
        const monthName = dayDate.toLocaleString('ru-RU', { month: 'short' });
        const hours = calculateHoursForDay(day.date);

        return (
          <Box
            key={day.date}
            style={{ border: '1px solid #ccc', padding: '8px', userSelect:'none'}}
            bgcolor={dayDate.toDateString() === new Date().toDateString() ? blue['A100'] : ''}
            ref={dayDate.getDate() === new Date().getDate() ? currentDateRef : null}
          >
            <Stack direction={'column'} spacing={1} divider={<Divider orientation="horizontal" flexItem />}>
              <Typography variant="body2">{dayOfMonth} {monthName}</Typography>
              <Button variant="contained" size="small" color={
                  day.isDayOff ? 'error' :
                  day.isShortDay ? (hours >= 7 ? 'success' : 'warning') :
                  hours >= 8 ? 'success' : 'warning'
                } onClick={() => handleDayClick(dayOfMonth)} fullWidth>
                {hours} ч
              </Button>
            </Stack>
          </Box>
        );
      })}
      </Stack>
      <Dialog open={showReportModal} onClose={handleCloseReportModal} fullWidth maxWidth="md">
        <DialogTitle>Отчеты за {selectedDate.toLocaleDateString('ru-RU')}
        <IconButton
                aria-label="close"
                onClick={handleCloseReportModal}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                }}
              >
                <MuiIcon.Close />
        </IconButton>
        </DialogTitle>
        <ReportModalContent reports={getReportsForCurrentDay(selectedDate)} onRefresh={fetchCalendarData} />
      </Dialog>
    </Container>
  );
};

export default Calendar;
