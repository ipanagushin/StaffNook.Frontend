import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Container } from '@mui/material';
import { IShortUserInfoDto } from '@/models/UserModels';

interface UserListTableProps {
  users?: IShortUserInfoDto[];
}

const UserListTable: React.FC<UserListTableProps> = ({ users }) => {
  return (
    <Container maxWidth='xl' sx={{ mt: 2}}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Фото</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Специальность</TableCell>
              <TableCell>Дата приема</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar src={user.attachment?.previewUrl} alt="Avatar" />
                </TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.specialityName}</TableCell>
                <TableCell>{new Date(user.employmentDate).toLocaleDateString('ru-RU')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserListTable;
