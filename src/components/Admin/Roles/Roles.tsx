import RoleDataService from "@/services/RoleDataService";
import { useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import RoleEdit from "./RoleEdit";
import ContainerLoader from "@/components/ContainerLoader";
import { IRoleInfoDto } from "@/models/RoleModels";

const Roles = () => {
    
    const [roles, setRoles] = useState<IRoleInfoDto[]>();
    const [selectedRoleId, setSelectedRoleId] = useState<string>()
    
    const [showEditModal, setShowEditModal] = useState(false); 

    useEffect(() => {
        const fetchRoles = async () => {
            let roles = await RoleDataService.getAllRoles();
            setRoles(roles.data);
        }

        fetchRoles()
            .catch(console.error);

    }, [])

    const renderTitleCard = (role: IRoleInfoDto) =>{
        return(
            <MuiMaterial.Typography gutterBottom variant="h5" component="div">
                {role.name}
            </MuiMaterial.Typography>
        )
    }

    const onEditRole = (roleId: string) =>{
        setShowEditModal(true);
        setSelectedRoleId(roleId);
    }

    
    const renderActionsCard = (role: IRoleInfoDto) =>{
        return (
            <>
                <MuiMaterial.IconButton aria-label="edit" onClick={_ => onEditRole(role.id)}>
                    <MuiIcon.Edit/>
                </MuiMaterial.IconButton>
                
                <MuiMaterial.IconButton disabled aria-label="drop">
                    <MuiIcon.Delete/>
                </MuiMaterial.IconButton>
            </>
        )
    }

    const renderRole = (role: IRoleInfoDto) => {
        return (
            <MuiMaterial.Card key={role.id} variant="outlined" sx={{
                marginTop:'1%'
            }}>
                <MuiMaterial.CardHeader 
                    title={renderTitleCard(role)}
                    action={renderActionsCard(role)}>
                </MuiMaterial.CardHeader>
            </MuiMaterial.Card>
        )
    }
    
    return <>
        <MuiMaterial.Typography variant="h4">Роли</MuiMaterial.Typography>
        <ContainerLoader Loading={roles === undefined}>
            {
                roles?.map(x => renderRole(x))
            }
        </ContainerLoader>
        {
            showEditModal && <RoleEdit RoleId={selectedRoleId || ''} CloseModal={() => setShowEditModal(false)}/>
        }
    </>
}

export default Roles;