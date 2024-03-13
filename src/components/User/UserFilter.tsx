import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { IUserPageFilter } from '@/models/PageFilters/UserPageFilter';
import { ReferenceType } from '@/common/ReferenceType';
import { IAvailableValue } from '@/models/AvailableValue';
import ReferenceSelect from '../ReferenceSelect';
import { Container, Stack, Typography, IconButton, Collapse } from '@mui/material';
import PhoneInput from '../PhoneInput';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface FilterProps {
  onChange: (filter: IUserPageFilter) => void;
}

const UserFilter: React.FC<FilterProps> = ({ onChange }) => {
  const [filter, setFilter] = useState<IUserPageFilter>({ pageSize: 10, pageNumber: 1 });
  const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

  useEffect(() => {
    onChange(filter);
  }, [filter]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter(prevFilter => ({ ...prevFilter, fullName: value }));
  };

  const handleInputPhoneChange = (value: string) => {
    if(value.length === 11 && filter.phoneNumber !== value) {
      setFilter(prevFilter => ({ ...prevFilter, phoneNumber: value }));
    }
  };

  const handleSpecialityChange = (value?: IAvailableValue | null) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      specialityId: value?.value !== null ? value?.value : undefined,
    }));
  }

  const toggleFiltersVisibility = () => {
    setFiltersVisible(prevState => !prevState);
  }

  return (
    <Container maxWidth="lg" sx={{ p: 2 }} >
        <Typography  variant="h6" component="div">
            Фильтры
            <IconButton onClick={toggleFiltersVisibility}>
              {filtersVisible ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </Typography>

        <Collapse in={filtersVisible}>
          <Stack spacing={3}>
            <ReferenceSelect
              customLabel='Специальность'
              referenceType={ReferenceType.Speciality}
              onChange={handleSpecialityChange}
            />
            <PhoneInput onChange={handleInputPhoneChange} />
            <TextField
              value={filter.fullName}
              label='ФИО сотрудника'
              variant='standard'
              onChange={handleInputChange}
            />
          </Stack>
        </Collapse>
    </Container>
  );
};

export default UserFilter;
