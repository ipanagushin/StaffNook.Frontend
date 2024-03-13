import React from 'react';
import Pagination from '@mui/material/Pagination';
import { IPageInfo } from '@/models/PaginationModel';
import { Box } from '@mui/material';

interface PaginationProps {
  pageInfo?: IPageInfo;
  onChange: (page: number) => void;
}

const UserPagination: React.FC<PaginationProps> = ({ pageInfo, onChange }) => {
  return (
    <Box>
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
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          width:1,
          height:'50px',
          m:2
      }}
      onChange={(_, page)=> onChange(page)}
      />
    </Box>
  );
};

export default UserPagination;
