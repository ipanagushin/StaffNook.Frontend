import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from '@mui/material';
import { IUserProjectHistoryDto } from '@/models/UserModels';

interface UserProjectHistoryListTableProps {
  userProjectHistory?: IUserProjectHistoryDto[];
}

const UserProjectHistoryListTable: React.FC<UserProjectHistoryListTableProps> = ({ userProjectHistory }) => {

  return (
    <Container maxWidth='xl' sx={{ mt: 2 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Клиент</TableCell>
              <TableCell>Проект</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Дата начала</TableCell>
              <TableCell>Дата окончания</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userProjectHistory && userProjectHistory.map(history => (
              <TableRow key={history.projectId}>
                <TableCell>{history.clientName}</TableCell>
                <TableCell>{history.projectName}</TableCell>
                <TableCell>{history.projectRoleName}</TableCell>
                <TableCell>{history.workingTime}</TableCell>
                <TableCell>{history.startDate && new Date(history.startDate).toLocaleDateString('ru-RU')}</TableCell>
                <TableCell>{history.endDate && new Date(history.endDate).toLocaleDateString('ru-RU')}</TableCell>
              </TableRow>
            ))}
            {userProjectHistory?.length === 0 && <TableRow><TableCell colSpan={6}>Нет данных</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UserProjectHistoryListTable;
