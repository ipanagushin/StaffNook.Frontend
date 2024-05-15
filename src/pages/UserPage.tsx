import React from 'react';
import { Container } from '@mui/material';
import UserFilter from '@/components/User/UserFilter';
import { IUserPageFilter } from '@/models/PageFilters/UserPageFilter';
import { IPaginationResult } from '@/models/PaginationModel';
import { IShortUserInfoDto } from '@/models/UserModels';
import UserListTable from '@/components/User/UserListTable';
import UserPagination from '@/components/User/UserPagination';
import UserDataService from "@/services/UserDataService";
import PrivateLayout from '@/components/Layouts/PrivateLayout';
import UserModal from '@/components/User/UserModal';

const UserPage: React.FC = () => {
  const [filter, setFilter] = React.useState<IUserPageFilter>({pageSize: 10, pageNumber: 1});
  const [paginationResult, setPaginationResult] = React.useState<IPaginationResult<IShortUserInfoDto>>();
  const [selectedUserId, setSelectedUserId] = React.useState<string | undefined | null>(null);
  
  React.useEffect(() => {
    UserDataService.getByPageFilter(filter).then(result => {
      setPaginationResult(result.data);
    }).catch(error => {
      console.error('Error fetching users:', error);
    });
  }, [filter]);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
  };

  const handleFilterChange = (newFilter: IUserPageFilter) => {
    setFilter(newFilter);
  };

  const handlePageChange = (pageNumber: number) => {
    setFilter((prevFilter) => ({ ...prevFilter, pageNumber }));
  }

  return (
        <PrivateLayout>
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <UserFilter onChange={handleFilterChange} />
              <UserListTable users={paginationResult?.items} onUserClick={handleUserClick} />
              <UserPagination 
                pageInfo={paginationResult?.pageInfo}
                onChange={handlePageChange}
              />
              <UserModal userId={selectedUserId} onClose={handleCloseModal} />   
          </Container>
        </PrivateLayout>
  );
};

export default UserPage;
