import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, IconButton, Dialog, Box, Stack, Alert } from '@mui/material';
import EditWorkingTimeDialog from './EditWorkingTimeDialog';
import DeleteModal from '../DeleteModal';
import * as MuiIcon from "@mui/icons-material";
import { IWorkingTimeInfoDto } from '@/models/WorkingTimeModels';
import WorkingTimeDataService from '@/services/WorkingTimeDataService';
import { useSetRecoilState } from "recoil";
import { alertState } from "@/common/AppAtoms";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import CreateWorkingTimeDialog from './CreateWorkingTimeDialog';

interface ReportModalContentProps {
  reports: IWorkingTimeInfoDto[];
  onRefresh: () => void;
}

const ReportModalContent: React.FC<ReportModalContentProps> = ({ reports, onRefresh }) => {
  const [workingTimeInfo, setWorkingTimeInfo] = useState<IWorkingTimeInfoDto[]>([]);
  const [selectedWorkingTime, setSelectedWorkingTime] = useState<IWorkingTimeInfoDto | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const setAlertMessage = useSetRecoilState(alertState);

    useEffect(() => {
        setWorkingTimeInfo(reports || []);
    }, [reports]);

  const handleEdit = (report: IWorkingTimeInfoDto) => {
    setSelectedWorkingTime(report);
    setShowEditModal(true);
  };

  const handleDelete = (report: IWorkingTimeInfoDto) => {
    debugger;
    setSelectedWorkingTime(report);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedWorkingTime(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedWorkingTime(null);
  };

  const handleDeleteConfirmed = (objectId?: string) => {
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
    <Box p={2}>
        <Stack alignItems="center" pb={2}>
            <IconButton area-label='create' onClick={() => setShowCreateModal(true)}>
                <MuiIcon.AddCircleOutline fontSize="large"/>
            </IconButton>
        </Stack>
      {workingTimeInfo.length === 0 ? (
        <Alert severity="info">Отчетов пока нет</Alert>
      ) : (
        <List>
          {workingTimeInfo.map(report => (
            <React.Fragment key={report.id}>
              <ListItem>
                <ListItemText
                  primary={`Проект: ${report.projectName}`}
                  secondary={`Затраченное время: ${report.time}, Описание: ${report.description}`}
                />
                <IconButton onClick={() => handleEdit(report)}>
                  <MuiIcon.Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(report)}>
                  <MuiIcon.Delete />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
      <CreateWorkingTimeDialog 
        open={showCreateModal} 
        onClose={() => {
            setShowCreateModal(false)
            setTimeout(() => onRefresh(), 500);
        }}
      />
      <EditWorkingTimeDialog
        open={showEditModal}
        onClose={handleCloseEditModal}
        workingTime={selectedWorkingTime}
        onRefresh={() => onRefresh()}
      />
      <DeleteModal
        objectId={selectedWorkingTime?.id}
        onClose={handleCloseDeleteModal}
        handleDeleteConfirm={handleDeleteConfirmed}
        showModal={showDeleteModal}
      />
    </Box>
  );
};

export default ReportModalContent;
