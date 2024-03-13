import React, { useEffect, useState } from 'react';
import * as MuiMaterial from "@mui/material";
import NewsDataService from "@/services/NewsDataService";
import { INewsInfoDto } from '@/models/NewsModels';
import HTMLPreview from '../HTMLPreview';
import { scrollToTop } from '@/utils/WindowHelper';
import { INewsPageFilter } from '@/models/PageFilters/NewsPageFilter';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useRecoilState } from 'recoil';
import { appThemeMode } from '@/common/AppAtoms';

const NewsList: React.FC = () => {
  const [mode, _] = useRecoilState(appThemeMode);
  const [news, setNews] = useState<INewsInfoDto[]>([]);
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);
  const [elementCount, setElementCount] = useState(1);
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const filter : INewsPageFilter = {
          pageSize: rowsPerPage, 
          pageNumber: page
      };
        const response = await NewsDataService.getByPageFilter(filter);
        const pageResult = response.data;
        setNews(pageResult.items);
        setElementCount(pageResult.pageInfo.totalPageCount == 0 ? 1 : pageResult.pageInfo.totalPageCount);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, [page]);

  const renderTitleCard = (news: INewsInfoDto) =>{
    return(
      <>
        <MuiMaterial.Typography gutterBottom variant="h5" component="div">
            {news.title}
        </MuiMaterial.Typography>
        <MuiMaterial.Divider />
      </>        
    )
  }

  const handleExpandClick = (newsId: string) => {
    if (expandedNewsId === newsId) {
      setExpandedNewsId(null);
    } else {
      setExpandedNewsId(newsId);
    }
  };

  const renderCardContent = (news: INewsInfoDto) => {
    const isExpanded = expandedNewsId === news.id;
    const isOverflown = news.description.length > 150;
  
    return (
      <MuiMaterial.Collapse in={isExpanded} collapsedSize={150}>
        <MuiMaterial.Box>
          <HTMLPreview html={news.description} />
          {isOverflown && (
            <MuiMaterial.Box>
                <div style={{
                  visibility: isExpanded ? 'hidden' : 'visible',
                  backgroundImage: mode == 'light' ? 
                  "linear-gradient(rgb(255 255 255 / 14%), rgb(255 255 255 / 60%))" : 
                  "linear-gradient(180deg, rgb(18 18 18 / 3%) 0%, rgb(18 18 18 / 61%) 35%)",
                  bottom: 0,
                  height: '150px',
                  position: 'absolute',
                  width: '-webkit-fill-available',
                  left:0
                }}/>
              <MuiMaterial.Button 
                  onClick={() => handleExpandClick(news.id)} 
                  sx={{position:'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)'}}
                  color="primary" 
                  size='small' 
                  variant='text' 
                  endIcon={isExpanded ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}>
                    {isExpanded ? 'Свернуть' : 'Подробнее'}
              </MuiMaterial.Button>
            </MuiMaterial.Box>
          )}
        </MuiMaterial.Box>

      </MuiMaterial.Collapse>
    )
  };
  

  const renderCard = (news: INewsInfoDto) =>{
    return(
        <MuiMaterial.ListItem key={news.id}>
          <MuiMaterial.Card sx={{width: '100%'}}>
            <MuiMaterial.CardHeader title={renderTitleCard(news)}/>
            <MuiMaterial.CardContent>
                {renderCardContent(news)}
            </MuiMaterial.CardContent>
          </MuiMaterial.Card>
        </MuiMaterial.ListItem>
    )
  }

  const handleChange = (_e: any, page: number) => {
    scrollToTop();
    setPage(page);
  };

  return (
    <MuiMaterial.Container maxWidth={'xl'} sx={{minHeight: '100vh', pt: 2}}>
      {news.length > 0 ? (
      <>
        <MuiMaterial.List>
          {news.map((item) => (
            renderCard(item)
          ))}
        </MuiMaterial.List>
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
      </>
      ) : (
        <MuiMaterial.Alert severity="info">Новостей пока нет</MuiMaterial.Alert>
      )}
    </MuiMaterial.Container>
  );
};

export default NewsList;