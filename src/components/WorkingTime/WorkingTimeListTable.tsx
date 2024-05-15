import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, IconButton } from '@mui/material';
import { IWorkingTimeInfoDto } from '@/models/WorkingTimeModels';
import DeleteModal from '../DeleteModal';
import EditWorkingTimeDialog from './EditWorkingTimeDialog';
import * as MuiIcon from "@mui/icons-material";
import WorkingTimeDataService from '@/services/WorkingTimeDataService';
import { useSetRecoilState } from "recoil";
import { alertState } from "@/common/AppAtoms";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import CurrentUserService from '@/services/CurrentUserService';

interface WorkingTimeListTableProps {
  workingTimes?: IWorkingTimeInfoDto[];
  onRefresh: () => void;
  userId?: string | null;
}

const WorkingTimeListTable: React.FC<WorkingTimeListTableProps> = ({ workingTimes, userId, onRefresh }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [selectedWorkingTime, setSelectedWorkingTime] = useState<IWorkingTimeInfoDto | null>(null);
  const setAlertMessage = useSetRecoilState(alertState);

  const handleEdit = (workingTime: IWorkingTimeInfoDto) => {
    setSelectedWorkingTime(workingTime);
    setEditDialogOpen(true);
  };

  const handleDelete = (objectId?: string) => {
    setSelectedWorkingTime(null);
    if(objectId) {
        WorkingTimeDataService.deleteWorkingTime(objectId)
        .then(()=>{
            setAlertMessage(SystemAlertConstants.DeleteTimeReportSuccessConstant);
        })
        .catch(()=>{
            setAlertMessage(SystemAlertConstants.DeleteTimeReportErrorConstant);
        });
    }
    setTimeout(() => onRefresh(), 500);
  };

  return (
    <Container maxWidth='xl' sx={{ mt: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Проект</TableCell>
              <TableCell>Затраченное время</TableCell>
              <TableCell>Описание</TableCell>
              <TableCell>Дата</TableCell>
              {userId == CurrentUserService.getUserInfo()?.id && <TableCell>Действия</TableCell>}
              {/* <TableCell>Действия</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {workingTimes && workingTimes.map(workingTime => (
              <TableRow key={workingTime.id}>
                <TableCell></TableCell>
                <TableCell>{workingTime.projectName}</TableCell>
                <TableCell>{workingTime.time}</TableCell>
                <TableCell>{workingTime.description}</TableCell>
                <TableCell>{workingTime.reportDate ? new Date(workingTime.reportDate).toLocaleDateString('ru-RU') : "Неизвестно"}</TableCell>
                {userId == CurrentUserService.getUserInfo()?.id && 
                    <TableCell>
                    <IconButton onClick={() => handleEdit(workingTime)} aria-label="edit">
                        <MuiIcon.Edit />
                    </IconButton>
                    <IconButton onClick={() => {
                        setSelectedWorkingTime(workingTime);
                        setDeleteModalOpen(true);
                    }} aria-label="delete">
                        <MuiIcon.Delete />
                    </IconButton>
                    </TableCell>
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
        showModal={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        handleDeleteConfirm={handleDelete}
        objectId={selectedWorkingTime?.id}
      />
      <EditWorkingTimeDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        workingTime={selectedWorkingTime}
        onRefresh={onRefresh}
      />
    </Container>
  );
};

export default WorkingTimeListTable;
