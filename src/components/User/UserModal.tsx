import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, IconButton, Avatar, Grid } from '@mui/material';
import * as MuiIcon from "@mui/icons-material";
import { IUserInfoDto } from '@/models/UserModels';
import UserDataService from "@/services/UserDataService";

interface UserModalProps {
  userId: string | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ userId, onClose }) => {
  const [user, setUser] = useState<IUserInfoDto | null>(null);

  useEffect(() => {
    if (userId) {
      // Запрос информации о пользователе через UserDataService
      UserDataService.getUserById(userId).then(result => {
        setUser(result.data);
      }).catch(error => {
        console.error('Error fetching user details:', error);
      });
    } else {
        setUser(null);
    }
  }, [userId]);

  return (
    <Dialog
      maxWidth={'lg'}
      fullWidth
      open={!!user}
      onClose={onClose}
    >
      {user && (
        <>
          <DialogTitle>
            {user.lastName} {user.firstName} {user.middleName}
            <IconButton
              aria-label="close"
              onClick={onClose}
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
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar src={user.attachment?.previewUrl} alt="Avatar" variant="rounded" sx={{ width: 220, height: 220 }} />
              </Grid>
              <Grid item xs={10} sm={6}>
                <Typography variant="body1" id="user-modal-description">
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="body1">
                  <strong>Телефон:</strong> {user.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Дата рождения:</strong> {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('ru-RU') : 'не указано'}
                </Typography>
                <Typography variant="body1">
                  <strong>Дата приема на работу:</strong> {user.employmentDate}
                </Typography>
                <Typography variant="body1">
                  <strong>Логин:</strong> {user.login}
                </Typography>
                <Typography variant="body1">
                  <strong>Роль:</strong> {user.roleId}
                </Typography>
                <Typography variant="body1">
                  <strong>Специальность:</strong> {user.specialityId}
                </Typography>
                {/* Другие поля пользователя */}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Закрыть</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default UserModal;
