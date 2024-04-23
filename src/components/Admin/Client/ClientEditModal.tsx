import { ChangeEvent, useState, useEffect } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import ContainerLoader from "@/components/ContainerLoader";
import ClientDataService from "@/services/ClientDataService";
import { alertState } from "@/common/AppAtoms";
import { useSetRecoilState } from "recoil";
import { IUpdateClientDto } from "@/models/ClientModels";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';

interface IProps {
  clientId?: string;
  onClose: () => void;
  onRefresh: () => void;
  showModal: boolean;
}

const ClientEditModal = (modalInfo: IProps) => {
  const [client, setClient] = useState<IUpdateClientDto>({
    name: "",
    shortName: "",
  });
  const [nameError, setNameError] = useState(false);
  const [shortNameError, setShortNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const setAlertMessage = useSetRecoilState(alertState);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameError(!value.trim());
    setClient((prevClient) => ({
      ...prevClient,
      name: value,
    }));
  };

  const handleShortNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setShortNameError(!value.trim());
    setClient((prevClient) => ({
      ...prevClient,
      shortName: value,
    }));
  };

  const handleClose = () => {
    setClient({
      name: "",
      shortName: "",
    });
    setNameError(false);
    setShortNameError(false);
    modalInfo.onClose();
  };

  const onSaveClient = () => {
    if (!client.name || client.name.trim() === "") {
      setNameError(true);
      return;
    }

    if (!client.shortName || client.shortName.trim() === "") {
      setShortNameError(true);
      return;
    }

    setLoading(true);

    const postAct = () => {
      setLoading(false);
      setClient({
        name: "",
        shortName: "",
      });
      setNameError(false);
      setShortNameError(false);
      modalInfo.onClose();
      modalInfo.onRefresh();
      setAlertMessage(SystemAlertConstants.UpdateClientSuccessConstant);
    };

    if (client) {
      ClientDataService.updateClient(modalInfo.clientId!, client)
        .then(postAct)
        .catch(() => {
          setLoading(false);
          setAlertMessage(SystemAlertConstants.UpdateClientErrorConstant);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (modalInfo.showModal && modalInfo.clientId) {
        try {
          const response = await ClientDataService.getClientById(modalInfo.clientId);
          setClient(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [modalInfo.showModal, modalInfo.clientId]);

  return (
    <>
      <ContainerLoader Loading={loading}>
        <MuiMaterial.Dialog open={modalInfo.showModal} maxWidth={'md'} fullWidth>
          <MuiMaterial.DialogTitle>
            Редактирование клиента
            <MuiMaterial.IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <MuiIcon.Close />
            </MuiMaterial.IconButton>
          </MuiMaterial.DialogTitle>
          <MuiMaterial.DialogContent>
            <MuiMaterial.Stack spacing={2}>
              <MuiMaterial.TextField
                label="Полное название"
                variant="standard"
                size="medium"
                value={client.name}
                onChange={handleNameChange}
                error={nameError}
                helperText={nameError && "Поле не может быть пустым"}
              />
              <MuiMaterial.TextField
                label="Короткое название"
                variant="standard"
                size="medium"
                value={client.shortName}
                onChange={handleShortNameChange}
                error={shortNameError}
                helperText={shortNameError && "Поле не может быть пустым"}
              />
              <MuiMaterial.Button variant="outlined" onClick={onSaveClient}>
                Сохранить
              </MuiMaterial.Button>
            </MuiMaterial.Stack>
          </MuiMaterial.DialogContent>
        </MuiMaterial.Dialog>
      </ContainerLoader>
    </>
  );
};

export default ClientEditModal;
