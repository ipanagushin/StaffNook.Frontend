import React from 'react';
import Pagination from '@mui/material/Pagination';
import { IPageInfo } from '@/models/PaginationModel';
import { Box } from '@mui/material';

interface UserProjectHistoryPaginationProps {
  pageInfo?: IPageInfo;
  onChange: (page: number) => void;
}

const UserProjectHistoryPagination: React.FC<UserProjectHistoryPaginationProps> = ({ pageInfo, onChange }) => {
  return (
    <Box sx={{mb:2}}>
        <Pagination
        count={pageInfo?.totalPageCount || 1}
        page={pageInfo?.currentPage || 1}
        siblingCount={1}
        boundaryCount={1}
        variant='text'
        shape='rounded'
        color='primary'
        sx={{
            display: 'flex', 
            justifyContent: 'center',
            marginTop: 2,
        }}
        onChange={(_, page)=> onChange(page)}
        />
    </Box>
  );
};

export default UserProjectHistoryPagination;
