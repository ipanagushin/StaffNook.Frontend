import Loader from "@/components/Loader";
import ProjectDataService from "@/services/ProjectDataService";
import { useEffect, useState } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import { scrollToTop } from "@/utils/WindowHelper";
import { IPaginationResult } from "@/models/PaginationModel";
import { useSetRecoilState } from "recoil";
import { alertState } from "@/common/AppAtoms";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import DeleteModal from "../DeleteModal";
import { IProjectInfoDto } from "@/models/ProjectModels";
import { IProjectPageFilter } from "@/models/PageFilters/ProjectPageFilter";
import ProjectInfoModal from "./ProjectInfoModal";
import PreviewIcon from '@mui/icons-material/Preview';
import ProjectCreateModal from "./ProjectCreateModal";

const Projects = () =>{

    const [projects, setProjects] = useState<IProjectInfoDto[]>();
    const [actualProject, setActualProject] = useState<IProjectInfoDto>();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);
    const [elementCount, setElementCount] = useState(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const setAlertMessage = useSetRecoilState(alertState);
    

    // Функция для открытия модального окна с информацией о проекте
    const handleViewProject = (project: IProjectInfoDto) => {
        setActualProject(project);
        setShowInfoModal(true);
    };

    const handleChange = (_e: any, page: React.SetStateAction<number>) => {
        scrollToTop();
        setPage(page);
    };

    const onDeleteProjectClick = (project: IProjectInfoDto) =>{
        setActualProject(project);
        setIsDeleteDialogOpen(true);
    }

    const handleDeleteConfirm = (projectId?: string) => {
        setActualProject(undefined);
        if(projectId) {
            ProjectDataService.delete(projectId)
            .then(()=>{
                setAlertMessage(SystemAlertConstants.DeleteProjectSuccessConstant);
            })
            .catch(()=>{
                setAlertMessage(SystemAlertConstants.DeleteProjectErrorConstant);
            });
        }
        onRefresh();
    }

    const onAddProjectClick = () =>{
        setActualProject(undefined);
        setShowCreateModal(true);
    }

    const onEditProjectClick = (project: IProjectInfoDto) =>{
        setActualProject(project);
        setShowEditModal(true);
    }

    const onRefresh = () =>{
        const getByFilter = async () => {
            setIsLoading(true);
            const filter : IProjectPageFilter = {
                pageSize: rowsPerPage, 
                pageNumber: page
            };
            const response = await ProjectDataService.getByPageFilter(filter);
            const pageResult : IPaginationResult<IProjectInfoDto>  = response.data;
            setProjects(pageResult.items);
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
    
    const renderTitleCard = (project: IProjectInfoDto) =>{
        return(
            <MuiMaterial.Typography gutterBottom variant="h5" component="div">
                {project.name}
            </MuiMaterial.Typography>
        )
    }
    
    const renderActionsCard = (project: IProjectInfoDto) =>{
        return (
            <>
                <MuiMaterial.IconButton aria-label="show">
                    <PreviewIcon onClick={()=>handleViewProject(project)}/>
                </MuiMaterial.IconButton>

                <MuiMaterial.IconButton aria-label="edit">
                    <MuiIcon.Edit onClick={()=>onEditProjectClick(project)}/>
                </MuiMaterial.IconButton>
                
                <MuiMaterial.IconButton aria-label="drop" onClick={()=> onDeleteProjectClick(project)}>
                    <MuiIcon.Delete/>
                </MuiMaterial.IconButton>
            </>
        )
    }

    const renderProject = (project: IProjectInfoDto) => {
        return (
            <MuiMaterial.Card key={project.id} variant="outlined" sx={{
                marginTop:'1%'
            }}>
                <MuiMaterial.CardHeader
                    title={renderTitleCard(project)}
                    action={renderActionsCard(project)}>
                </MuiMaterial.CardHeader>
                <MuiMaterial.CardContent>
                    <MuiMaterial.Typography variant="body1">
                        Дата начала: {project.startDate}
                    </MuiMaterial.Typography>
                    <MuiMaterial.Typography variant="body1">
                        Дата окончания: {project.endDate}
                    </MuiMaterial.Typography>
                </MuiMaterial.CardContent>
            </MuiMaterial.Card>
        )
    }

    return(
    <>
        <MuiMaterial.Typography variant="h4">Проекты</MuiMaterial.Typography>
        {isLoading ? (
            <Loader/>
        ) : (
            <>
                <MuiMaterial.Stack alignItems="center">
                    <MuiMaterial.IconButton area-label='create' onClick={onAddProjectClick}>
                        <MuiIcon.AddCircleOutline fontSize="large"/>
                    </MuiMaterial.IconButton>
                </MuiMaterial.Stack>
                {projects?.map(project => renderProject(project))}
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
            {/* <ProjectEditModal
                onClose={() => setShowEditModal(false)}
                onRefresh={onRefresh}
                showModal={showEditModal}
                projectId={actualProject?.id}
            />
            <ProjectCreateModal 
                onClose={() => setShowCreateModal(false)} 
                onRefresh={onRefresh} 
                showModal={showCreateModal}
            /> */}

            <ProjectInfoModal project={actualProject} onClose={() => setShowInfoModal(false)} showModal={showInfoModal}/>

            <DeleteModal 
            objectId={actualProject?.id} 
            showModal={isDeleteDialogOpen} 
            onClose={()=> setIsDeleteDialogOpen(false)}
            handleDeleteConfirm={handleDeleteConfirm}
            />

            <ProjectCreateModal 
                showModal={showCreateModal} 
                onRefresh={onRefresh} 
                onClose={() => setShowCreateModal(false)}
            />
            
            </>
        )}
    </>
    )}

export default Projects;
