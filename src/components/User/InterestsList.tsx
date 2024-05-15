import React from 'react';
import { Chip, Grid, Stack } from '@mui/material';
import { IInterestInfoDto } from '@/models/InterestModels';

interface InterestsListProps {
  interests?: IInterestInfoDto[];
}

const InterestsList: React.FC<InterestsListProps> = ({ interests }) => {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

  return (
    <Grid container spacing={0.3}>
      {interests && interests.map((interest) => (
        <Grid item>
            <Chip
                key={interest.id}
                label={interest.name}
                variant="filled"
                color='info'
                size='small'
                clickable
                onClick={handleClick}
            />
        </Grid>
      ))}
    </Grid>
  );
};

export default InterestsList;
