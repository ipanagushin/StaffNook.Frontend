import React, { useEffect, useState } from 'react';
import { Container, Typography, IconButton, Collapse, Stack, TextField } from '@mui/material';
import { IWorkingTimePageFilter } from '@/models/PageFilters/WorkingTimePageFilter';
import { ReferenceType } from '@/common/ReferenceType';
import { IAvailableValue } from '@/models/AvailableValue';
import ReferenceSelect from '../ReferenceSelect';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ProjectSelect from '../ProjectSelect';

interface FilterProps {
  onChange: (filter: IWorkingTimePageFilter) => void;
}

const WorkingTimeFilter: React.FC<FilterProps> = ({ onChange }) => {
  const [filter, setFilter] = useState<IWorkingTimePageFilter>({ pageSize: 10, pageNumber: 1 });
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

  useEffect(() => {
    onChange(filter);
  }, [filter]);

  const handleProjectChange = (value?: IAvailableValue | null) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      projectId: value?.value !== null ? value?.value : undefined,
    }));
  }

  const toggleFiltersVisibility = () => {
    setFiltersVisible(prevState => !prevState);
  }

  return (
    <Container maxWidth="lg" sx={{ p: 2 }}>
        <Typography  variant="h6" component="div">
            Фильтры
            <IconButton onClick={toggleFiltersVisibility}>
              {filtersVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </Typography>

        <Collapse in={filtersVisible}>
          <Stack spacing={3}>
            <ProjectSelect
              customLabel='Проект'
              onChange={handleProjectChange}
            />
          </Stack>
        </Collapse>
    </Container>
  );
};

export default WorkingTimeFilter;
