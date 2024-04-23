import { useState } from "react";
import * as MuiMaterial from "@mui/material";
import { IProjectInfoDto } from "@/models/ProjectModels";
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  onClose: () => void;
  showModal: boolean;
  project?: IProjectInfoDto;
}

const ProjectInfoModal = (modalInfo: IProps) => {
  const [activeTab, setActiveTab] = useState("contacts");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderBaseInfo = () => (
    <MuiMaterial.Box>
      <MuiMaterial.List>
        <MuiMaterial.ListItem>
          <MuiMaterial.ListItemText primary="Название проекта" secondary={modalInfo.project!.name} />
        </MuiMaterial.ListItem>
        <MuiMaterial.ListItem>
          <MuiMaterial.ListItemText primary="Руководитель проекта" secondary={modalInfo.project!.userName} />
        </MuiMaterial.ListItem>
        <MuiMaterial.ListItem>
          <MuiMaterial.ListItemText primary="Клиент" secondary={modalInfo.project!.clientName} />
        </MuiMaterial.ListItem>
        <MuiMaterial.ListItem>
          <MuiMaterial.ListItemText primary="Дата начала" secondary={modalInfo.project!.startDate} />
        </MuiMaterial.ListItem>
        <MuiMaterial.ListItem>
          <MuiMaterial.ListItemText primary="Дата окончания" secondary={modalInfo.project!.endDate} />
        </MuiMaterial.ListItem>
        <MuiMaterial.ListItem>
          <MuiMaterial.ListItemText primary="Тип проекта" secondary={modalInfo.project!.projectTypeName} />
        </MuiMaterial.ListItem>
      </MuiMaterial.List>
    </MuiMaterial.Box>
  );

  const renderContactsTab = () => (
    <MuiMaterial.List>
      {modalInfo.project!.projectContacts.map((contact, index) => (
        <MuiMaterial.ListItem key={index}>
          <MuiMaterial.ListItemText
            primary={`${contact.firstName} ${contact.lastName}`}
            secondary={
              <>
                <MuiMaterial.Typography variant="subtitle2">{contact.emailAddress}</MuiMaterial.Typography>
                <MuiMaterial.Typography variant="caption">{contact.additionalInformation}</MuiMaterial.Typography>
              </>
            }
          />
        </MuiMaterial.ListItem>
      ))}
    </MuiMaterial.List>
  );  

  const renderRolesTab = () => (
    <MuiMaterial.List>
      {modalInfo.project!.projectRoles.map((role, index) => (
        <MuiMaterial.ListItem key={index}>
          <MuiMaterial.ListItemText
            primary={role.name}
            secondary={<MuiMaterial.Typography variant="caption">{"Ставка за час: ₽" + role.hourlyFee}</MuiMaterial.Typography>}
            
          />
        </MuiMaterial.ListItem>
      ))}
    </MuiMaterial.List>
  );

  const renderEmployeesTab = () => (
    <MuiMaterial.List>
      {modalInfo.project!.projectEmployees.map((employee, index) => (
        <MuiMaterial.ListItem key={index}>
          <MuiMaterial.ListItemText primary={employee.userId} />
        </MuiMaterial.ListItem>
      ))}
    </MuiMaterial.List>
  );

  return (
    <>
      {modalInfo.project && (
        <MuiMaterial.Dialog fullWidth maxWidth={"xl"}
          open={modalInfo.showModal}
          onClose={() => modalInfo.onClose()}
        >
          <MuiMaterial.DialogTitle>{modalInfo.project.name}</MuiMaterial.DialogTitle>
          <MuiMaterial.IconButton
              aria-label="close"
              onClick={()=> modalInfo.onClose()}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
          </MuiMaterial.IconButton>
          <MuiMaterial.DialogContent>
            {renderBaseInfo()}
            <MuiMaterial.Tabs
              value={activeTab}
              onChange={(_, newValue) => handleTabChange(newValue)}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <MuiMaterial.Tab label="Контакты проекта" value="contacts" />
              <MuiMaterial.Tab label="Роли на проекте" value="roles" />
              <MuiMaterial.Tab
                label="Сотрудники на проекте"
                value="employees"
              />
            </MuiMaterial.Tabs>
            <MuiMaterial.Box role="tabpanel">
              {activeTab === "contacts" && renderContactsTab()}
              {activeTab === "roles" && renderRolesTab()}
              {activeTab === "employees" && renderEmployeesTab()}
            </MuiMaterial.Box>
          </MuiMaterial.DialogContent>
        </MuiMaterial.Dialog>
      )}
    </>
  );
};

export default ProjectInfoModal;
