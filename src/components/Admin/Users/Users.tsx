import Loader from "@/components/Loader";
import UserDataService from "@/services/UserDataService";
import { IUserInfoDto } from "@/models/UserModels";
import { useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { scrollToTop } from "@/utils/WindowHelper";
import { IPaginationResult } from "@/models/PaginationModel";
import { useSetRecoilState } from "recoil";
import { alertState } from "@/common/AppAtoms";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import DeleteModal from "../../DeleteModal";
import UserEditModal from "./UserEditModal";
import UserCreateModal from "./UserCreateModal";
import ChangePasswordModal from "./ChangePasswordModal";
import IdentityService from "@/services/IdentityService";
import { IChangePasswordRequest } from "@/models/IdentityModels";


const Users = () =>{

    const [users, setUsers] = useState<IUserInfoDto[]>();
    const [actualUser, setActualUser] = useState<IUserInfoDto>();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);
    const [elementCount, setElementCount] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const setAlertMessage = useSetRecoilState(alertState);

    const handleChange = (_e: any, page: React.SetStateAction<number>) => {
        scrollToTop();
        setPage(page);
    };

    const onDeleteUserClick = (user: IUserInfoDto) =>{
        setActualUser(user);
        setIsDeleteDialogOpen(true);
    }

    const onUserPasswordChangeClick = (user: IUserInfoDto) =>{
        setActualUser(user);
        setIsChangePasswordDialogOpen(true);
    }

    const handleDeleteConfirm = (objectId?: string) => {
        setActualUser(undefined);
        if(objectId) {
            UserDataService.delete(objectId)
            .then(()=>{
                setAlertMessage(SystemAlertConstants.DeleteUserSuccessConstant);
            })
            .catch(()=>{
                setAlertMessage(SystemAlertConstants.DeleteUserErrorConstant);
            });
        }
        onRefresh();
    }

    const handleChangePassword = (userId?: string, password?: string) => {
        setActualUser(undefined);
        if(userId && password) {
            let request : IChangePasswordRequest={
                userId: userId,
                currentPassword: password,
                newPassword: password
            }
            IdentityService.changePassword(request)
            .then(()=>{
                setAlertMessage(SystemAlertConstants.ChangePasswordSuccessConstant);
            }).catch(()=>{
                setAlertMessage(SystemAlertConstants.ChangePasswordErrorConstant);
            });
        }
        onRefresh();
    }

    const onAddUserClick = () =>{
        setActualUser(undefined);
        setShowCreateModal(true);
    }

    const onEditUserClick = (user: IUserInfoDto) =>{
        setActualUser(user);
        setShowEditModal(true);
    }

    const onRefresh = () =>{
        const getByFilter = async () => {
            setIsLoading(true);
            const response = await UserDataService.getAdminByPageFilter(page, rowsPerPage);
            const pageResult : IPaginationResult<IUserInfoDto>  = response.data;
            setUsers(pageResult.items);
            setElementCount(pageResult.pageInfo.totalPageCount);
        }
      
          getByFilter()
          .then(()=>{
            setIsLoading(false);
          })
          .catch(()=>{
            setAlertMessage(SystemAlertConstants.FetchErrorConstant);
          });
    }

    useEffect(() => {
        onRefresh();
    }, [])
    

    const renderTitleCard = (user: IUserInfoDto) =>{
        return(
            <MuiMaterial.Typography gutterBottom variant="h5" component="div">
                {user.lastName} {user.firstName} {user.middleName}
            </MuiMaterial.Typography>
        )
    }
    
    const renderActionsCard = (user: IUserInfoDto) =>{
        return (
            <>
                <MuiMaterial.IconButton aria-label="password" onClick={()=> onUserPasswordChangeClick(user)}>
                    <MuiIcon.Password/>
                </MuiMaterial.IconButton>

                <MuiMaterial.IconButton aria-label="edit">
                    <MuiIcon.Edit onClick={()=>onEditUserClick(user)}/>
                </MuiMaterial.IconButton>
                
                <MuiMaterial.IconButton aria-label="drop" onClick={()=> onDeleteUserClick(user)}>
                    <MuiIcon.Delete/>
                </MuiMaterial.IconButton>
            </>
        )
    }

    const renderUser = (user: IUserInfoDto) => {
        return (
            <MuiMaterial.Card key={user.id} variant="outlined" sx={{
                marginTop:'1%'
            }}>
                <MuiMaterial.CardHeader
                    avatar={<MuiMaterial.Avatar sx={{width:'100px', height:'100px'}} src={user.attachment?.previewUrl}/>}
                    title={renderTitleCard(user)}
                    action={renderActionsCard(user)}>
                </MuiMaterial.CardHeader>
            </MuiMaterial.Card>
        )
    }

    return(
    <>
        <MuiMaterial.Typography variant="h4">Сотрудники</MuiMaterial.Typography>
        {isLoading ? (
            <Loader/>
        ) : (
            <>
                <MuiMaterial.Stack alignItems="center">
                    <MuiMaterial.IconButton area-label='create' onClick={onAddUserClick}>
                        <MuiIcon.AddCircleOutline fontSize="large"/>
                    </MuiMaterial.IconButton>
                </MuiMaterial.Stack>
                {users?.map(user => renderUser(user))}
                <MuiMaterial.Pagination
                    color='primary'
                    count={elementCount}
                    page={page}
                    size='large'
                    shape="rounded"
                    variant='text'
                    onChange={handleChange}
                    sx={{
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',
                        justifyContent: 'center',
                        width:1,
                        height:'50px',
                        m:2
                    }}
                />
            <UserEditModal
                onClose={() => setShowEditModal(false)}
                onRefresh={onRefresh}
                showModal={showEditModal}
                userId={actualUser?.id}
            />
            <UserCreateModal 
                onClose={() => setShowCreateModal(false)} 
                onRefresh={onRefresh} 
                showModal={showCreateModal}
            />

            <DeleteModal 
            objectId={actualUser?.id} 
            showModal={isDeleteDialogOpen} 
            onClose={()=> setIsDeleteDialogOpen(false)}
            handleDeleteConfirm={handleDeleteConfirm}
            />

            <ChangePasswordModal
                userId={actualUser?.id}
                showModal={isChangePasswordDialogOpen}
                onClose={() => setIsChangePasswordDialogOpen(false)}
                handleChangePassword={handleChangePassword}
            />
            </>
        )}
    </>
    )}

export default Users;