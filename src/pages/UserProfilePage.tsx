import React, { useEffect, useState } from 'react';
import { Button, Typography, Avatar, Stack, Link, Container, Card, CardHeader, CardActions, CardContent, Grid, Divider, Box, Tabs, Tab, Collapse, Paper } from '@mui/material';
import { IUserInfoDto, IUserProjectHistoryDto } from '@/models/UserModels';
import CurrentUserService from "@/services/CurrentUserService";
import InterestsList from '@/components/User/InterestsList';
import PrivateLayout from '@/components/Layouts/PrivateLayout';
import UserDataService from '@/services/UserDataService';
import WorkingTimeListTable from '@/components/WorkingTime/WorkingTimeListTable';
import WorkingTimePagination from '@/components/WorkingTime/WorkingTimePagination';
import { IPaginationResult } from '@/models/PaginationModel';
import { IWorkingTimeInfoDto } from '@/models/WorkingTimeModels';
import { IWorkingTimePageFilter } from '@/models/PageFilters/WorkingTimePageFilter';
import WorkingTimeDataService from '@/services/WorkingTimeDataService';
import UserEditModal from '@/components/User/UserEditModal';
import UserProjectHistoryListTable from '@/components/User/UserProjectHistoryListTable';
import UserProjectHistoryPagination from '@/components/User/UserProjectHistoryPagination';
import { IUserProjectHistoryPageFilter } from '@/models/PageFilters/UserProjectHistoryPageFilter';

const UserProfilePage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUserInfoDto | null>(null);
  const [activeTab, setActiveTab] = useState("project-history");
  const [paginationResult, setPaginationResult] = useState<IPaginationResult<IWorkingTimeInfoDto>>();
  const [filter, setFilter] = useState<IWorkingTimePageFilter>({ pageSize: 10, pageNumber: 1 });
  const [showEditModal, setShowEditModal] = useState(false);
  const [historyPaginationResult, setHistoryPaginationResult] = useState<IPaginationResult<IUserProjectHistoryDto>>();
  const [historyFilter, setHistoryFilter] = useState<IUserProjectHistoryPageFilter>({ pageSize: 10, pageNumber: 1 });
  
  

  useEffect(() => {
    // Получение информации о текущем пользователе
    const userInfo = CurrentUserService.getUserInfo();
    setFilter((prevFilter) => ({ ...prevFilter, userId: userInfo?.id }));
    setHistoryFilter((prevFilter) => ({ ...prevFilter, userId: userInfo?.id }));
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = () => {
    try {
      const userInfo = CurrentUserService.getUserInfo();

      if (!userInfo) {
        return;
      }

      UserDataService.getUserById(userInfo.id)
        .then(response => {
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching current user details:', error);
        });

      setCurrentUser(userInfo);
    } catch (error) {
      console.error('Error fetching current user details:', error);
    }
  };

  useEffect(() => {
    fetchWorkingTimeData();
  }, [filter]);

  useEffect(() => {
    fetchHistoryData();
  }, [historyFilter]);

  const fetchHistoryData =  () => {
    UserDataService.getProjectHistoryByPageFilter(historyFilter).then(result => {
        setHistoryPaginationResult(result.data);
      }).catch(error => {
        console.error('Error fetching working times:', error);
      });
  };

  const handleHistoryPageChange = (pageNumber: number) => {
    setHistoryFilter((prevFilter) => ({ ...prevFilter, pageNumber }));
  }

  const handlePageChange = (pageNumber: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, pageNumber }));
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const fetchWorkingTimeData =  () => {
    WorkingTimeDataService.getByPageFilter(filter).then(result => {
        setPaginationResult(result.data);
      }).catch(error => {
        console.error('Error fetching working times:', error);
      });
  }

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  return (
    <PrivateLayout>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {currentUser && (
            <Card>
                <CardHeader title={
                                    <Typography variant="h4">
                                        {currentUser.lastName} {currentUser.firstName} {currentUser.middleName}
                                    </Typography>
                }/>

        <CardContent sx={{ textAlign: 'start' }}>
        <Grid container spacing={3}>
        <Grid item>
            <Avatar src={currentUser.attachment?.previewUrl} alt="Avatar" variant='rounded' sx={{ width: 250, height: 250 }} />
            <Box sx={{ mt: 1 }} textAlign={'center'}>
                <Button variant="outlined" onClick={handleEditProfile} size='small'>Редактировать профиль</Button>
            </Box>
        </Grid>
            <Grid item xs={12} sm={9}>
                <Stack spacing={0.6}>
                    <Typography variant="body1" id="user-modal-description">
                    Email: <strong>{currentUser.email}</strong>
                    </Typography>
                    <Typography variant="body1">
                    Телефон: <strong><Link href={`tel:${currentUser.phoneNumber}`}>+{currentUser.phoneNumber}</Link></strong>
                    </Typography>
                    <Typography variant="body1">
                    Дата рождения: <strong>{currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth).toLocaleDateString('ru-RU') : 'не указано'}</strong>
                    </Typography>
                    <Typography variant="body1">
                    Интересы: <strong><InterestsList interests={currentUser.interests} /></strong>
                    </Typography>
                    <Divider variant='fullWidth' sx={{p:1}}></Divider>
                    <Typography variant="body1">
                    Специальность: <strong>{currentUser.specialityName ?? 'не указано'}</strong>
                    </Typography>
                    <Typography variant="body1">
                    В компании с: <strong>{currentUser.employmentDate ? new Date(currentUser.employmentDate).toLocaleDateString('ru-RU') : 'не указано'}</strong>
                    </Typography>
                </Stack>
            </Grid>
        </Grid>
        <Box >
            <Tabs
                value={activeTab}
                onChange={(_, newValue) => handleTabChange(newValue)}
                indicatorColor="primary"
                textColor="primary"
                sx={{ mt:2 }}
                // component={Paper}
            >
                <Tab label="История работы" value="project-history" />
                <Tab label="Отчеты" value="reports" />
                {/* <Tab label="Роли на проекте" value="roles" /> */}
            </Tabs>
            <Box role="tabpanel">
                <Collapse in={activeTab === "project-history"}>
                    <UserProjectHistoryListTable userProjectHistory={historyPaginationResult?.items} />
                    <UserProjectHistoryPagination
                      pageInfo={historyPaginationResult?.pageInfo} 
                      onChange={handleHistoryPageChange}
                    />
                </Collapse>
                <Collapse in={activeTab === "reports"}>
                <WorkingTimeListTable userId={currentUser.id} workingTimes={paginationResult?.items} onRefresh={fetchWorkingTimeData}/>
                <WorkingTimePagination 
                    pageInfo={paginationResult?.pageInfo}
                    onChange={handlePageChange}
                />
                </Collapse>
                {/* <Collapse in={activeTab === "roles"}>

                </Collapse> */}
            </Box>
        </Box>
        </CardContent>
        </Card>
        )}
        </Container>
        {currentUser && (
            <UserEditModal user={currentUser} showModal={showEditModal} onClose={() => {
                setShowEditModal(false);
                fetchCurrentUser();
                fetchWorkingTimeData();
            }}/>
        )}
    </PrivateLayout>
  );
};

export default UserProfilePage;
