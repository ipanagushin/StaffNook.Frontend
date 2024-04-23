import { ChangeEvent, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import ContainerLoader from "@/components/ContainerLoader";
import ProjectDataService from "@/services/ProjectDataService";
import { alertState } from "@/common/AppAtoms";
import { useSetRecoilState } from "recoil";
import { ICreateProjectDto, IProjectContactDto, IProjectRoleDto } from "@/models/ProjectModels";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ruRU } from '@mui/x-date-pickers/locales';
import ruLocale from "date-fns/locale/ru";
import ReferenceSelect from "@/components/ReferenceSelect";
import { ReferenceType } from "@/common/ReferenceType";
import { IAvailableValue } from "@/models/AvailableValue";
import { TransitionGroup } from 'react-transition-group';
import ClientSelect from "@/components/ClientSelect";
import UserSelect from "@/components/UserSelect";

interface IProps {
  onClose: () => void;
  onRefresh: () => void;
  showModal: boolean;
}

const ProjectCreateModal = (modalInfo: IProps) => {
  const [project, setProject] = useState<ICreateProjectDto>();
  const [newContact, setNewContact] = useState<IProjectContactDto>();
  const [newRole, setNewRole] = useState<IProjectRoleDto>();
  const [nameError, setNameError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const [clientIdError, setClientIdError] = useState(false);
  const [startDateError, setStartDateError] = useState(false);
  const [endDateError, setEndDateError] = useState(false);
  const [projectTypeIdError, setProjectTypeIdError] = useState(false);
  const setAlertMessage = useSetRecoilState(alertState);
  const [activeTab, setActiveTab] = useState("contacts");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleClose = () => {
    setProject(undefined);
    setNewContact(undefined);
    setActiveTab('contacts');
    modalInfo.onClose();
    clearErrors();
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewContact(prevContact => ({
      ...prevContact,
      [name]: value
    }));
  };

  const handleRolesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setNewRole(prevRole => ({
      ...prevRole,
      [name]: value
    }));
  };

  const handleAddRole = () => {
    if (newRole?.name && newRole?.hourlyFee) {
      setProject((prevProject) => ({
        ...prevProject,
        roles: [...prevProject?.roles ?? [], newRole],
      }))
    //   setNewContact(undefined);
    } else {
      // Handle validation errors or display a message to the user
    }
  };

  // todo add validation
  const handleAddContact = () => {
    if (newContact?.firstName && newContact?.lastName && newContact?.emailAddress) {
      setProject((prevProject) => ({
        ...prevProject,
        contacts: [...prevProject?.contacts ?? [], newContact],
      }))
    //   setNewContact(undefined);
    } else {
      // Handle validation errors or display a message to the user
    }
  };

  const handleRemoveContact = (index: number) => {
    let contacts = project?.contacts ?? [];
    contacts = contacts.filter((_, i) => i !== index);

    setProject((prevProject) => ({
      ...prevProject,
      contacts: contacts,
    }))
  };

  const handleRemoveRole = (index: number) => {
    let roles = project?.roles ?? [];
    roles = roles.filter((_, i) => i !== index);

    setProject((prevProject) => ({
      ...prevProject,
      roles: roles,
    }))
  };

  const clearErrors = () => {
    setNameError(false);
    setUserIdError(false);
    setClientIdError(false);
    setStartDateError(false);
    setEndDateError(false);
    setProjectTypeIdError(false);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameError(!value.trim());
    setProject((prevProject) => ({
      ...prevProject,
      name: value,
    }));
  };

  const handleUserIdChange = (value?: IAvailableValue | null) => {
    setProject((prevProject) => ({
      ...prevProject,
      userId: value?.value,
    }));
  };

  const handleClientIdChange = (value?: IAvailableValue | null) => {
    setProject((prevProject) => ({
      ...prevProject,
      clientId: value?.value,
    }));
  };

  const handleStartDateChange = (value?: string) => {
    setStartDateError(!value?.trim());
    setProject((prevProject) => ({
      ...prevProject,
      startDate: value,
    }));
  };

  const handleEndDateChange = (value?: string) => {
    setEndDateError(!value?.trim());
    setProject((prevProject) => ({
      ...prevProject,
      endDate: value,
    }));
  };

  function handleProjectTypeIdChange(value?: IAvailableValue | null | undefined): void {
    setProjectTypeIdError(!value);
    setProject((prevProject) => ({ ...prevProject, projectTypeId: value?.value }));
  }

  const onSaveProject = () => {
    clearErrors();

    if (!project?.name || project.name.trim() === "") {
      setNameError(true);
      return;
    }

    if (!project?.userId || project.userId.trim() === "") {
      setUserIdError(true);
      return;
    }

    if (!project?.clientId || project.clientId.trim() === "") {
      setClientIdError(true);
      return;
    }

    if (!project?.startDate || project.startDate.trim() === "") {
      setStartDateError(true);
      return;
    }

    if (!project?.endDate || project.endDate.trim() === "") {
      setEndDateError(true);
      return;
    }

    if (!project?.projectTypeId || project.projectTypeId.trim() === "") {
      setProjectTypeIdError(true);
      return;
    }

    const postAct = () => {
      setProject(undefined);
      modalInfo.onClose();
      modalInfo.onRefresh();
    //   setAlertMessage(SystemAlertConstants.CreateProjectSuccessConstant);
    };

    ProjectDataService.createProject(project)
      .then(postAct)
    //   .catch(() => setAlertMessage(SystemAlertConstants.CreateProjectErrorConstant));
  };

  const renderBaseFields = () => (
    <MuiMaterial.Stack spacing={2}>
        <MuiMaterial.TextField
            label="Название проекта"
            variant="standard"
            size="medium"
            value={project?.name}
            onChange={handleNameChange}
            error={nameError}
            helperText={nameError && "Поле не может быть пустым"}
        />

        <UserSelect
          customLabel="Руководитель проекта"
          onChange={handleUserIdChange}
          defaultValue={project?.userId}
          error={userIdError}
          helperText={userIdError && "Поле не может быть пустым"}
        />

        <ClientSelect
            customLabel="Клиент (заказчик)"
            defaultValue={project?.clientId}
            error={clientIdError}
            helperText={clientIdError && "Поле не может быть пустым"}
            onChange={handleClientIdChange}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale} localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
            <DatePicker 
                label="Дата начала"
                value={project?.startDate ? new Date(project?.startDate) : null}
                onChange={(value)=> handleStartDateChange(value?.toISOString().split('T')[0])}
                slotProps={{
                    textField: {
                    error: !!startDateError,
                    helperText: startDateError && "Некорректная дата"
                    }
                }}
            />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ruLocale} localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}>
            <DatePicker 
                label="Дата окончания"
                value={project?.endDate ? new Date(project?.endDate) : null}
                onChange={(value)=> handleEndDateChange(value?.toISOString().split('T')[0])}
                slotProps={{
                    textField: {
                    error: !!endDateError,
                    helperText: endDateError && "Некорректная дата"
                    }
                }}
            />
        </LocalizationProvider>

        <ReferenceSelect 
            customLabel="Тип проекта"
            referenceType={ReferenceType.ProjectType} 
            onChange={handleProjectTypeIdChange}
            error={projectTypeIdError}
            helperText = {projectTypeIdError && "Выберите проект"}
        />
    </MuiMaterial.Stack>
  );

    const renderContactsTab = () => (
        <MuiMaterial.Box minHeight={100}>
                <MuiMaterial.Container sx={{ textAlign: "center", mb: 2 }}>
                    <MuiMaterial.Stack 
                        spacing={2} 
                        divider={<MuiMaterial.Divider orientation="vertical" flexItem />} 
                        direction={{ xs: 'column', sm: 'row' }}
                    >
                        <MuiMaterial.TextField
                            name="firstName"
                            label="Имя"
                            value={newContact?.firstName}
                            variant="standard"
                            onChange={handleContactChange}
                        />
                        <MuiMaterial.TextField
                            name="lastName"
                            label="Фамилия"
                            variant="standard"
                            value={newContact?.lastName}
                            onChange={handleContactChange}
                        />
                        <MuiMaterial.TextField
                            name="emailAddress"
                            label="Email адрес"
                            variant="standard"
                            type="email"
                            value={newContact?.emailAddress}
                            onChange={handleContactChange}
                        />
                        <MuiMaterial.TextField
                            name="additionalInformation"
                            label="Дополнительная информация"
                            variant="standard"
                            value={newContact?.additionalInformation}
                            onChange={handleContactChange}
                        />
                    </MuiMaterial.Stack>
                    <MuiMaterial.Button sx={{ mt:2 }} variant="contained" onClick={handleAddContact}>Добавить контакт</MuiMaterial.Button>
                </MuiMaterial.Container>
                <MuiMaterial.Divider variant="middle"/>
            <MuiMaterial.List>
                <TransitionGroup>
                    {project?.contacts?.map((contact, index) => (
                        <MuiMaterial.Collapse key={index}>
                            <MuiMaterial.ListItem component={MuiMaterial.Paper} variant="outlined">
                                <MuiMaterial.ListItemText
                                    primary={`${contact.firstName} ${contact.lastName}`}
                                    secondary={
                                    <>
                                        <MuiMaterial.Typography variant="subtitle2">{contact.emailAddress}</MuiMaterial.Typography>
                                        <MuiMaterial.Typography variant="caption">{contact.additionalInformation}</MuiMaterial.Typography>
                                    </>
                                    }
                                />
                                <MuiMaterial.ListItemSecondaryAction>
                                <MuiMaterial.IconButton edge="end" onClick={() => handleRemoveContact(index)}>
                                    <MuiIcon.Delete/>
                                </MuiMaterial.IconButton>
                                </MuiMaterial.ListItemSecondaryAction>
                            </MuiMaterial.ListItem>
                        </MuiMaterial.Collapse>
                    ))}
                    {project?.contacts?.length === 0 && <MuiMaterial.ListItem>Нет контактов</MuiMaterial.ListItem>}
                </TransitionGroup>
            </MuiMaterial.List>
        </MuiMaterial.Box>
    );

    const renderRolesTab = () => (
      <MuiMaterial.Box minHeight={100}>
        <MuiMaterial.Container sx={{ textAlign: "center", mb: 2 }}>
            <MuiMaterial.Stack 
                spacing={2} 
                divider={<MuiMaterial.Divider orientation="vertical" flexItem />} 
                direction={{ xs: 'column', sm: 'row' }}
            >
              <MuiMaterial.TextField
                  name="name"
                  label="Название роли"
                  value={newRole?.name}
                  variant="standard"
                  onChange={handleRolesChange}
              />
              
              <MuiMaterial.TextField
                name="hourlyFee"
                label="Ставка за час"
                value={newRole?.hourlyFee}
                variant="standard"
                type="number"
                onChange={handleRolesChange}
              />

            </MuiMaterial.Stack>
            <MuiMaterial.Button sx={{ mt:2 }} variant="contained" onClick={handleAddRole}>Добавить роль</MuiMaterial.Button>
            </MuiMaterial.Container>
            <MuiMaterial.Divider variant="middle"/>
            <MuiMaterial.List>
                <TransitionGroup>
                    {project?.roles?.map((role, index) => (
                        <MuiMaterial.Collapse key={index}>
                            <MuiMaterial.ListItem component={MuiMaterial.Paper} variant="outlined">
                                <MuiMaterial.ListItemText
                                    primary={`${role.name}`}
                                    secondary={<MuiMaterial.Typography variant="subtitle2">{role.hourlyFee} ₽</MuiMaterial.Typography>}
                                />
                                <MuiMaterial.ListItemSecondaryAction>
                                <MuiMaterial.IconButton edge="end" onClick={() => handleRemoveRole(index)}>
                                    <MuiIcon.Delete/>
                                </MuiMaterial.IconButton>
                                </MuiMaterial.ListItemSecondaryAction>
                            </MuiMaterial.ListItem>
                        </MuiMaterial.Collapse>
                    ))}
                    {project?.roles?.length === 0 && <MuiMaterial.ListItem>Нет ролей</MuiMaterial.ListItem>}
                </TransitionGroup>
            </MuiMaterial.List>
        </MuiMaterial.Box>
    );

  return (
    <>
      <ContainerLoader Loading={false}>
        <MuiMaterial.Dialog open={modalInfo.showModal} maxWidth={'md'} fullWidth>
          <MuiMaterial.DialogTitle>
            Создание проекта
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
              {renderBaseFields()}
              <MuiMaterial.Divider/>
            <MuiMaterial.Tabs
              value={activeTab}
              onChange={(_, newValue) => handleTabChange(newValue)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <MuiMaterial.Tab label="Контакты проекта" value="contacts" />
              <MuiMaterial.Tab label="Роли на проекте" value="roles" />
            </MuiMaterial.Tabs>
            <MuiMaterial.Box role="tabpanel">
                <MuiMaterial.Collapse in={activeTab === "contacts"}>
                    {renderContactsTab()}
                </MuiMaterial.Collapse>
                <MuiMaterial.Collapse in={activeTab === "roles"}>
                    {renderRolesTab()}
                </MuiMaterial.Collapse>
            </MuiMaterial.Box>

              <MuiMaterial.Button variant="outlined" onClick={onSaveProject}>
                Сохранить
              </MuiMaterial.Button>
            </MuiMaterial.Stack>
          </MuiMaterial.DialogContent>
        </MuiMaterial.Dialog>
      </ContainerLoader>
    </>
  );
};

export default ProjectCreateModal;