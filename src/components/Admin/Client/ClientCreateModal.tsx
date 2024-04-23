import { ChangeEvent, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import ContainerLoader from "@/components/ContainerLoader";
import ClientDataService from "@/services/ClientDataService";
import { alertState } from "@/common/AppAtoms";
import { useSetRecoilState } from "recoil";
import { ICreateClientDto } from "@/models/ClientModels";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';

interface IProps {
  onClose: () => void;
  onRefresh: () => void;
  showModal: boolean;
}

const ClientCreateModal = (modalInfo: IProps) => {
  const [client, setClient] = useState<ICreateClientDto>({
    name: "",
    shortName: "",
  });
  const [nameError, setNameError] = useState(false);
  const [shortNameError, setShortNameError] = useState(false);
  const setAlertMessage = useSetRecoilState(alertState);

  const handleClose = () => {
    setClient({
      name: "",
      shortName: "",
    });
    modalInfo.onClose();
    setNameError(false);
    setShortNameError(false);
  };

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

  const onSaveClient = () => {
    if (!client.name || client.name.trim() === "") {
      setNameError(true);
      return;
    }

    if (!client.shortName || client.shortName.trim() === "") {
      setShortNameError(true);
      return;
    }

    const postAct = () => {
      setClient({
        name: "",
        shortName: "",
      });
      modalInfo.onClose();
      modalInfo.onRefresh();
      setNameError(false);
      setShortNameError(false);
      setAlertMessage(SystemAlertConstants.CreateClientSuccessConstant);
    };

    ClientDataService.createClient(client)
      .then(postAct)
      .catch(() => setAlertMessage(SystemAlertConstants.CreateClientErrorConstant));
  };

  return (
    <>
      <ContainerLoader Loading={false}>
        <MuiMaterial.Dialog open={modalInfo.showModal} maxWidth={'md'} fullWidth>
          <MuiMaterial.DialogTitle>
            Создание клиента
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

export default ClientCreateModal;
