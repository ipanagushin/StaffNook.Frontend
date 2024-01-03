import Loader from "@/components/Loader";
import UserDataService from "@/services/UserDataService";
import { IUserInfoDto } from "@/models/UserModels";
import { useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { scrollToTop } from "@/common/WindowHelper";
import { IPaginationResult } from "@/models/PaginationModel";
import { useSetRecoilState } from "recoil";
import { alertState } from "@/common/AppAtoms";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import DeleteModal from "../DeleteModal";
import UserEditModal from "./UserEditModal";


const Users = () =>{

    const [users, setUsers] = useState<IUserInfoDto[]>();
    const [actualUser, setActualUser] = useState<IUserInfoDto>();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);
    const [elementCount, setElementCount] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const setAlertMessage = useSetRecoilState(alertState);

    const handleChange = (_e: any, page: React.SetStateAction<number>) => {
        scrollToTop();
        setPage(page);
    };

    const onDeleteUserClick = (user: IUserInfoDto) =>{
        setActualUser(user);
        setIsDeleteDialogOpen(true);
    }

    const handleDeleteConfirm = async (objectId?: string) => {
        setActualUser(undefined);
        if(objectId) {
            await UserDataService.delete(objectId);
        }
        onRefresh();
    }

    const onAddNewsClick = () =>{
        setActualUser(undefined);
        setShowEditModal(true);
    }

    const onEditNewsClick = (user: IUserInfoDto) =>{
        setActualUser(user);
        setShowEditModal(true);
    }

    const onRefresh = () =>{
        const getByFilter = async () => {
            setIsLoading(true);
            const response = await UserDataService.getByPageFilter(page, rowsPerPage);
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
                <MuiMaterial.IconButton aria-label="edit">
                    <MuiIcon.Edit onClick={()=>onEditNewsClick(user)}/>
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
                    title={renderTitleCard(user)}
                    action={renderActionsCard(user)}>
                </MuiMaterial.CardHeader>
                <MuiMaterial.CardContent>
                    <MuiMaterial.Typography variant="body1">
                        Email: {user.email}
                    </MuiMaterial.Typography>
                </MuiMaterial.CardContent>
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
                    <MuiMaterial.IconButton area-label='create' onClick={onAddNewsClick}>
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
            <DeleteModal 
            objectId={actualUser?.id} 
            showModal={isDeleteDialogOpen} 
            onClose={()=> setIsDeleteDialogOpen(false)}
            handleDeleteConfirm={handleDeleteConfirm}
            />
            </>
        )}
    </>
    )}

export default Users;