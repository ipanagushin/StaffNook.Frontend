import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Avatar, Grid, Tabs, Tab, Box, Collapse, Stack, Link, Divider, Paper } from '@mui/material';
import * as MuiIcon from "@mui/icons-material";
import { IUserInfoDto, IUserProjectHistoryDto } from '@/models/UserModels';
import UserDataService from "@/services/UserDataService";
import WorkingTimeListTable from '../WorkingTime/WorkingTimeListTable';
import WorkingTimePagination from '../WorkingTime/WorkingTimePagination';
import { IPaginationResult } from '@/models/PaginationModel';
import { IWorkingTimeInfoDto } from '@/models/WorkingTimeModels';
import { IWorkingTimePageFilter } from '@/models/PageFilters/WorkingTimePageFilter';
import WorkingTimeDataService from '@/services/WorkingTimeDataService';
import InterestsList from './InterestsList';
import UserProjectHistoryListTable from './UserProjectHistoryListTable';
import UserProjectHistoryPagination from './UserProjectHistoryPagination';
import { IUserProjectHistoryPageFilter } from '@/models/PageFilters/UserProjectHistoryPageFilter';
import CurrentUserService from '@/services/CurrentUserService';

interface UserModalProps {
  userId?: string | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<IUserInfoDto | null>(null);
  const [activeTab, setActiveTab] = useState("project-history");
  const [paginationResult, setPaginationResult] = useState<IPaginationResult<IWorkingTimeInfoDto>>();
  const [historyPaginationResult, setHistoryPaginationResult] = useState<IPaginationResult<IUserProjectHistoryDto>>();
  
  const [filter, setFilter] = useState<IWorkingTimePageFilter>({ pageSize: 10, pageNumber: 1, userId: userId });
  const [historyFilter, setHistoryFilter] = useState<IUserProjectHistoryPageFilter>({ pageSize: 10, pageNumber: 1, userId: userId });
  
  useEffect(() => {
    if (userId) {
      setFilter((prevFilter) => ({ ...prevFilter, userId }));
      setHistoryFilter((prevFilter) => ({ ...prevFilter, userId }));
      UserDataService.getUserById(userId).then(result => {
        setUser(result.data);
      }).catch(error => {
        console.error('Error fetching user details:', error);
      });
    } else {
        setUser(null);
    }
  }, [userId]);

  useEffect(() => {
    fetchWorkingTimeData();
  }, [filter]);

  useEffect(() => {
    fetchHistoryData();
  }, [historyFilter])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handlePageChange = (pageNumber: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, pageNumber }));
  }

  const handleHistoryPageChange = (pageNumber: number) => {
    setHistoryFilter((prevFilter) => ({ ...prevFilter, pageNumber }));
  }

  const fetchWorkingTimeData =  () => {
    WorkingTimeDataService.getByPageFilter(filter).then(result => {
        setPaginationResult(result.data);
      }).catch(error => {
        console.error('Error fetching working times:', error);
      });
  }

  const fetchHistoryData =  () => {
    UserDataService.getProjectHistoryByPageFilter(historyFilter).then(result => {
        setHistoryPaginationResult(result.data);
      }).catch(error => {
        console.error('Error fetching working times:', error);
      });
  }

  const handleClose = () => {
    setPaginationResult(undefined);
    onClose();
  }

  return (
    <Dialog
      maxWidth={'lg'}
      fullWidth
      open={!!user}
      onClose={handleClose}
    >
      {user && (
        <>
          <DialogTitle>
            {user.lastName} {user.firstName} {user.middleName}
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
            <Grid container spacing={3}>
              <Grid item>
                <Avatar src={user.attachment?.previewUrl} alt="Avatar" variant="rounded" sx={{ width: 220, height: 220 }} />
              </Grid>
              <Grid item xs={12} sm={9}>
                <Stack spacing={0.6}>
                  <Typography variant="body1" id="user-modal-description">
                    Email: <strong>{user.email}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Телефон: <strong><Link href={`tel:${user.phoneNumber}`}>+{user.phoneNumber}</Link></strong>
                  </Typography>
                  <Typography variant="body1">
                    Дата рождения: <strong>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('ru-RU') : 'не указано'}</strong>
                  </Typography>
                  <Typography variant="body1">
                    Интересы: <strong><InterestsList interests={user.interests} /></strong>
                  </Typography>
                  <Divider variant='fullWidth' sx={{p:1}}></Divider>
                  <Typography variant="body1">
                    Специальность: <strong>{user.specialityName ?? 'не указано'}</strong>
                  </Typography>
                  <Typography variant="body1">
                    В компании с: <strong>{user.employmentDate ? new Date(user.employmentDate).toLocaleDateString('ru-RU') : 'не указано'}</strong>
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
            <Box component={Paper}>
              <Tabs
                  value={activeTab}
                  onChange={(_, newValue) => handleTabChange(newValue)}
                  indicatorColor="primary"
                  textColor="primary"
                  sx={{ mt:2 }}
                  // component={Paper}
                >
                  <Tab label="История работы" value="project-history" />
                  {(CurrentUserService.getUserInfo()?.isAdmin === true || CurrentUserService.getUserInfo()?.id == userId) && <Tab label="Отчеты" value="reports" />}
                </Tabs>
                <Box role="tabpanel">
                  <Collapse in={activeTab === "project-history"}>
                    <UserProjectHistoryListTable userProjectHistory={historyPaginationResult?.items} />
                    <UserProjectHistoryPagination
                      pageInfo={historyPaginationResult?.pageInfo} 
                      onChange={handleHistoryPageChange}
                    />
                  </Collapse>
                  {(CurrentUserService.getUserInfo()?.isAdmin === true || CurrentUserService.getUserInfo()?.id == userId) &&
                  (
                    <Collapse in={activeTab === "reports"}>
                    <WorkingTimeListTable userId={userId} workingTimes={paginationResult?.items} onRefresh={fetchWorkingTimeData}/>
                    <WorkingTimePagination 
                      pageInfo={paginationResult?.pageInfo}
                      onChange={handlePageChange}
                    />
                  </Collapse>
                  )}
                  {/* <Collapse in={activeTab === "roles"}>

                  </Collapse> */}
                </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default UserModal;
