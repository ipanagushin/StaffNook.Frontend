import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { useEffect, useState } from "react";
import ClaimDataService from "@/services/ClaimDataService";
import RoleDataService from "@/services/RoleDataService";
import { IGroupedClaim } from "@/models/ClaimModels";
import { IEditRoleDto } from "@/models/RoleModels";
import ContainerLoader from "@/components/ContainerLoader";


interface IRoleEditProps{
    roleId?: string,
    closeModal: () => void
}

const RoleEdit = (props: IRoleEditProps) =>{

    const [groupedClaims, setGroupedClaims] = useState<IGroupedClaim[]>();

    const [role, setRole] = useState<IEditRoleDto>();
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            let role = await RoleDataService.getById(props.roleId!);
            setRole(role.data);
        }

        const fetchClaims = async () => {
            let claims = await ClaimDataService.getClaims();
            setGroupedClaims(claims.data);
        }

        const fetchAll = async () =>{
            if(props.roleId){
                await fetchRole();
            }
            await fetchClaims();    
        }

        fetchAll()
            .then(_ => setLoader(false))
            .catch(console.error)
    }, [])

    const onChangeClaim = (checked: boolean, claimKey: string) =>{
        let claims = role?.claims;

        if(checked){
            claims?.push(claimKey);
            
            setRole(role =>({
                ...role,
                claims: claims 
            }))
        }
        else{
            setRole(role => ({
                ...role,
                claims: claims?.filter(x => x !== claimKey)
            }));
        }
    }

    const onClickSaveChanges = () =>{
        //todo save changes
        
        props.closeModal();
    }

    const renderClaims = (claims: {[name:string]:string}) =>{

        return Object.keys(claims).map(claimKey =>{
            let claimValue = claims[claimKey];
            return(
                <>
                    <MuiMaterial.FormGroup key={claimKey}>
                        <MuiMaterial.FormControlLabel 
                            sx={{userSelect: 'none'}}
                            control={
                                <MuiMaterial.Checkbox
                                    checked={role?.claims?.includes(claimKey)}
                                    name={claimKey}
                                    onChange={(_, check) => onChangeClaim(check, claimKey)}/>
                            }
                            label={claimValue}
                        />
                    </MuiMaterial.FormGroup>
                </>
            )
        })
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return(
        <>
    <ContainerLoader Loading={loader}>
        <MuiMaterial.Modal
            open={true}
            onClose={props.closeModal}
        >
            <MuiMaterial.Box sx={style}>
                <MuiMaterial.IconButton
                            aria-label="close"
                            onClick={props.closeModal}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                            >
                    <MuiIcon.Close />
                </MuiMaterial.IconButton>
                <MuiMaterial.Stack spacing={2}>
                    <MuiMaterial.Typography variant="h5">
                        { props.roleId ? `Редактирование роли "${role?.name}"` : "Создание роли" }
                    </MuiMaterial.Typography>
                    <MuiMaterial.FormControl>
                        <MuiMaterial.FormLabel>
                            Название
                        </MuiMaterial.FormLabel>
                        <MuiMaterial.TextField 
                            variant="outlined"
                            value={role?.name}
                            onChange={(event) => {
                                setRole(role => ({
                                    ...role,
                                    Name: event.target.value
                                }))
                            }}
                        />
                    </MuiMaterial.FormControl>
                        <MuiMaterial.FormControl>
                            {
                                groupedClaims?.map(groupedClaim => {
                                    return(
                                        <>
                                            <MuiMaterial.FormLabel>
                                                {groupedClaim.groupName}
                                            </MuiMaterial.FormLabel>

                                            {renderClaims(groupedClaim.claims)}
                                        </>
                                    )
                                })
                            }
                            
                        </MuiMaterial.FormControl>
                        <MuiMaterial.Button variant="outlined" onClick={onClickSaveChanges}>
                            Сохранить
                        </MuiMaterial.Button>
                </MuiMaterial.Stack>
            </MuiMaterial.Box>
        </MuiMaterial.Modal>
    </ContainerLoader>
        </>
    )
}

export default RoleEdit;