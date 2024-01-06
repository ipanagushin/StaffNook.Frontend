import React, { useState } from 'react';
import { Button, Grid, Typography, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CalendarProps {
  // todo
}

  // Мок-данные для списанных часов и отчетов
  const mockData = [
    { date: 3, hours: 4 },
    { date: 7, hours: 6 },
    { date: 15, hours: 2 },
  ];


const Calendar: React.FC<CalendarProps> = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  return (
    <div style={{maxWidth: '100%', padding: '1rem 1rem 0'}}>
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
      <Grid container spacing={2} style={{display: 'flex', flexWrap: 'unset', overflowX: 'auto', padding: '1rem 0 0 1rem'}}>
        {Array.from({ length: 31 }, (_, index) => {
          const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), index + 1);
          const dayOfMonth = dayDate.getDate();
          const monthName = dayDate.toLocaleString('ru-RU', { month: 'short' });

          const dayData = mockData.find((item) => item.date === dayOfMonth);

          return (
            <Grid item key={index} style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'center' }}>
              <div>
                <Typography variant="body2">{dayOfMonth} {monthName}</Typography>
                <hr/>
                {/* <Typography variant="body2"></Typography> */}
                <Typography variant="subtitle2">{dayData ? dayData.hours : 0}</Typography>
                <Button variant="text" size="small" fullWidth>
                  +
                </Button>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Calendar;