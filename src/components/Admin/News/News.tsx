import Loader from "@/components/Loader";
import NewsDataService from "@/services/NewsDataService";
import { useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { scrollToTop } from "@/utils/WindowHelper";
import { IPaginationResult } from "@/models/PaginationModel";
import { useSetRecoilState } from "recoil";
import { alertState } from "@/common/AppAtoms";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import DeleteModal from "../../DeleteModal";
import { INewsInfoDto } from "@/models/NewsModels";
import { INewsPageFilter } from "@/models/PageFilters/NewsPageFilter";
import NewsCreateModal from "./NewsCreateModal";
import NewsEditModal from "./NewsEditModal";


const News = () =>{

    const [news, setNews] = useState<INewsInfoDto[]>();
    const [actualNews, setActualNews] = useState<INewsInfoDto>();
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

    const onDeleteUserClick = (user: INewsInfoDto) =>{
        setActualNews(user);
        setIsDeleteDialogOpen(true);
    }

    const handleDeleteConfirm = (objectId?: string) => {
        setActualNews(undefined);
        if(objectId) {
            NewsDataService.delete(objectId)
            .then(()=>{
                setAlertMessage(SystemAlertConstants.DeleteNewsSuccessConstant);
            })
            .catch(()=>{
                setAlertMessage(SystemAlertConstants.DeleteNewsErrorConstant);
            });
        }
        onRefresh();
    }

    const onAddNewsClick = () =>{
        setActualNews(undefined);
        setShowCreateModal(true);
    }

    const onEditUserClick = (user: INewsInfoDto) =>{
        setActualNews(user);
        setShowEditModal(true);
    }

    const onRefresh = () =>{
        const getByFilter = async () => {
            setIsLoading(true);
            const filter : INewsPageFilter = {
                pageSize: rowsPerPage, 
                pageNumber: page
            };
            const response = await NewsDataService.getByPageFilter(filter);
            const pageResult : IPaginationResult<INewsInfoDto>  = response.data;
            setNews(pageResult.items);
            setElementCount(pageResult.pageInfo.totalPageCount == 0 ? 1 : pageResult.pageInfo.totalPageCount);
        }
      
          getByFilter()
          .then(()=>{
            setIsLoading(false);
          })
          .catch(()=>{
            setAlertMessage(SystemAlertConstants.FetchErrorConstant);
            setIsLoading(false);
          });
    }

    useEffect(() => {
        onRefresh();
    }, [])
    

    const renderTitleCard = (news: INewsInfoDto) =>{
        return(
            <MuiMaterial.Typography gutterBottom variant="h5" component="div">
                {news.title}
            </MuiMaterial.Typography>
        )
    }
    
    const renderActionsCard = (news: INewsInfoDto) =>{
        return (
            <>
                <MuiMaterial.IconButton aria-label="edit">
                    <MuiIcon.Edit onClick={()=>onEditUserClick(news)}/>
                </MuiMaterial.IconButton>
                
                <MuiMaterial.IconButton aria-label="drop" onClick={()=> onDeleteUserClick(news)}>
                    <MuiIcon.Delete/>
                </MuiMaterial.IconButton>
            </>
        )
    }

    const renderNews = (news: INewsInfoDto) => {
        return (
            <MuiMaterial.Card key={news.id} variant="outlined" sx={{
                marginTop:'1%'
            }}>
                <MuiMaterial.CardHeader
                    title={renderTitleCard(news)}
                    action={renderActionsCard(news)}>
                </MuiMaterial.CardHeader>
                <MuiMaterial.CardContent>
                    <MuiMaterial.Typography variant="body1">
                        Дата создания: {news.createdAt ? new Date(news.createdAt).toLocaleString('ru-RU'): "Неизветсно"}
                    </MuiMaterial.Typography>
                </MuiMaterial.CardContent>
            </MuiMaterial.Card>
        )
    }

    return(
    <>
        <MuiMaterial.Typography variant="h4">Новости</MuiMaterial.Typography>
        {isLoading ? (
            <Loader/>
        ) : (
            <>
                <MuiMaterial.Stack alignItems="center">
                    <MuiMaterial.IconButton area-label='create' onClick={onAddNewsClick}>
                        <MuiIcon.AddCircleOutline fontSize="large"/>
                    </MuiMaterial.IconButton>
                </MuiMaterial.Stack>
                {news?.map(news => renderNews(news))}
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
            <NewsEditModal
                onClose={() => setShowEditModal(false)}
                onRefresh={onRefresh}
                showModal={showEditModal}
                newsId={actualNews?.id}
            />
            <NewsCreateModal 
                onClose={() => setShowCreateModal(false)} 
                onRefresh={onRefresh} 
                showModal={showCreateModal}
            />

            <DeleteModal 
            objectId={actualNews?.id} 
            showModal={isDeleteDialogOpen} 
            onClose={()=> setIsDeleteDialogOpen(false)}
            handleDeleteConfirm={handleDeleteConfirm}
            />
            </>
        )}
    </>
    )}

export default News;