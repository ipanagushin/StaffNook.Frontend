import React, { useEffect, useState } from 'react';
import { Container, Button } from '@mui/material';
import WorkingTimeFilter from '@/components/WorkingTime/WorkingTimeFilter';
import { IWorkingTimePageFilter } from '@/models/PageFilters/WorkingTimePageFilter';
import { IPaginationResult } from '@/models/PaginationModel';
import { IWorkingTimeInfoDto } from '@/models/WorkingTimeModels';
import WorkingTimeListTable from '@/components/WorkingTime/WorkingTimeListTable';
import WorkingTimePagination from '@/components/WorkingTime/WorkingTimePagination';
import WorkingTimeDataService from "@/services/WorkingTimeDataService";
import PrivateLayout from '@/components/Layouts/PrivateLayout';
import CreateWorkingTimeDialog from '@/components/WorkingTime/CreateWorkingTimeDialog';
import CurrentUserService from '@/services/CurrentUserService';

const WorkingTimePage: React.FC = () => {
  const [filter, setFilter] = useState<IWorkingTimePageFilter>({ pageSize: 10, pageNumber: 1 });
  const [paginationResult, setPaginationResult] = useState<IPaginationResult<IWorkingTimeInfoDto>>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    onRefresh();
  }, [filter]);

  const onRefresh =  () => {
    WorkingTimeDataService.getByPageFilter(filter).then(result => {
        setPaginationResult(result.data);
      }).catch(error => {
        console.error('Error fetching working times:', error);
      });
  }

  const handleFilterChange = (newFilter: IWorkingTimePageFilter) => {
    setFilter(newFilter);
  };

  const handlePageChange = (pageNumber: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, pageNumber }));
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    onRefresh();
  }

  return (
    <PrivateLayout>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <WorkingTimeFilter onChange={handleFilterChange} />
        <Button variant="contained" color="primary" onClick={handleDialogOpen} sx={{ mt: 2 }}>
          Добавить отчет
        </Button>
        <WorkingTimeListTable userId={CurrentUserService.getUserInfo()?.id} workingTimes={paginationResult?.items} onRefresh={onRefresh} />
        <WorkingTimePagination 
          pageInfo={paginationResult?.pageInfo}
          onChange={handlePageChange}
        />
        <CreateWorkingTimeDialog open={dialogOpen} onClose={handleDialogClose} />
      </Container>
    </PrivateLayout>
  );
};

export default WorkingTimePage;
