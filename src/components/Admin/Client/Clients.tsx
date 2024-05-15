import Loader from "@/components/Loader";
import ClientDataService from "@/services/ClientDataService";
import { useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { scrollToTop } from "@/utils/WindowHelper";
import { IPaginationResult } from "@/models/PaginationModel";
import { useSetRecoilState } from "recoil";
import { alertState } from "@/common/AppAtoms";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import DeleteModal from "../../DeleteModal";
import { IClientInfoDto } from "@/models/ClientModels";
import { IClientPageFilter } from "@/models/PageFilters/ClientPageFilter";
import ClientCreateModal from "./ClientCreateModal";
import ClientEditModal from "./ClientEditModal";

const Clients = () => {
    const [clients, setClients] = useState<IClientInfoDto[]>();
    const [actualClient, setActualClient] = useState<IClientInfoDto>();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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

    const onDeleteClientClick = (client: IClientInfoDto) => {
        setActualClient(client);
        setIsDeleteDialogOpen(true);
    }

    const handleDeleteConfirm = (objectId?: string) => {
        setActualClient(undefined);
        if (objectId) {
            ClientDataService.delete(objectId)
                .then(() => {
                    setAlertMessage(SystemAlertConstants.DeleteClientSuccessConstant);
                })
                .catch(() => {
                    setAlertMessage(SystemAlertConstants.DeleteClientErrorConstant);
                });
        }
        onRefresh();
    }

    const onAddClientClick = () => {
        setActualClient(undefined);
        setShowCreateModal(true);
    }

    const onEditClientClick = (client: IClientInfoDto) => {
        setActualClient(client);
        setShowEditModal(true);
    }

    const onRefresh = () => {
        const getByFilter = async () => {
            setIsLoading(true);
            const filter: IClientPageFilter = {
                pageSize: rowsPerPage,
                pageNumber: page
            };
            const response = await ClientDataService.getByPageFilter(filter);
            const pageResult: IPaginationResult<IClientInfoDto> = response.data;
            setClients(pageResult.items);
            setElementCount(pageResult.pageInfo.totalPageCount == 0 ? 1 : pageResult.pageInfo.totalPageCount);
        }

        getByFilter()
            .then(() => {
                setIsLoading(false);
            })
            .catch(() => {
                setAlertMessage(SystemAlertConstants.FetchErrorConstant);
                setIsLoading(false);
            });
    }

    useEffect(() => {
        onRefresh();
    }, [])

    const renderNameCard = (client: IClientInfoDto) => {
        return (
            <MuiMaterial.Typography gutterBottom variant="h5" component="div">
                {client.name}
            </MuiMaterial.Typography>
        )
    }

    const renderActionsCard = (client: IClientInfoDto) => {
        return (
            <>
                <MuiMaterial.IconButton aria-label="edit">
                    <MuiIcon.Edit onClick={() => onEditClientClick(client)} />
                </MuiMaterial.IconButton>

                <MuiMaterial.IconButton aria-label="drop" onClick={() => onDeleteClientClick(client)}>
                    <MuiIcon.Delete />
                </MuiMaterial.IconButton>
            </>
        )
    }

    const renderClient = (client: IClientInfoDto) => {
        return (
            <MuiMaterial.Card key={client.id} variant="outlined" sx={{
                marginTop: '1%'
            }}>
                <MuiMaterial.CardHeader
                    title={renderNameCard(client)}
                    action={renderActionsCard(client)}>
                </MuiMaterial.CardHeader>
                <MuiMaterial.CardContent>
                    <MuiMaterial.Typography variant="body1">
                        Дата создания: {client.createdAt ? new Date(client.createdAt).toLocaleString('ru-RU') : "Неизвестно"}
                    </MuiMaterial.Typography>
                </MuiMaterial.CardContent>
            </MuiMaterial.Card>
        )
    }

    return (
        <>
            <MuiMaterial.Typography variant="h4">Клиенты</MuiMaterial.Typography>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <MuiMaterial.Stack alignItems="center">
                        <MuiMaterial.IconButton area-label='create' onClick={onAddClientClick}>
                            <MuiIcon.AddCircleOutline fontSize="large" />
                        </MuiMaterial.IconButton>
                    </MuiMaterial.Stack>
                    {clients?.map(client => renderClient(client))}
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
                            width: 1,
                            height: '50px',
                            m: 2
                        }}
                    />
                    <ClientEditModal
                        onClose={() => setShowEditModal(false)}
                        onRefresh={onRefresh}
                        showModal={showEditModal}
                        clientId={actualClient?.id}
                    />
                    <ClientCreateModal
                        onClose={() => setShowCreateModal(false)}
                        onRefresh={onRefresh}
                        showModal={showCreateModal}
                    />
                    <DeleteModal
                        objectId={actualClient?.id}
                        showModal={isDeleteDialogOpen}
                        onClose={() => setIsDeleteDialogOpen(false)}
                        handleDeleteConfirm={handleDeleteConfirm}
                    />
                </>
            )}
        </>
    )
}

export default Clients;
