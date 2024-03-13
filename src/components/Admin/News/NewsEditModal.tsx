import { ChangeEvent, useState, useEffect } from "react";
import * as MuiMaterial from "@mui/material";
import * as MuiIcon from "@mui/icons-material";
import ContainerLoader from "@/components/ContainerLoader";
import NewsDataService from "@/services/NewsDataService";
import { alertState } from "@/common/AppAtoms";
import { useSetRecoilState } from "recoil";
import { ICreateNewsDto } from "@/models/NewsModels";
import * as SystemAlertConstants from '@/config/SystemAlertConstants';
import HtmlEditor from "../HtmlEditor/HtmlEditor";

interface IProps {
  newsId?: string;
  onClose: () => void;
  onRefresh: () => void;
  showModal: boolean;
}

const NewsEditModal = (modalInfo: IProps) => {
  const [news, setNews] = useState<ICreateNewsDto>({
    title: "",
    description: "",
  });
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [loading, setLoading] = useState(false);
  const setAlertMessage = useSetRecoilState(alertState);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitleError(!value.trim());
    setNews((prevNews) => ({
      ...prevNews,
      title: value,
    }));
  };

  const handleDescriptionChange = (value: string) => {
    setDescriptionError(!value.trim());
    setNews((prevNews) => ({
      ...prevNews,
      description: value,
    }));
  };

  const handleClose = () => {
    setNews({
      title: "",
      description: "",
    });
    setTitleError(false);
    setDescriptionError(false);
    modalInfo.onClose();
  };

  const onSaveNews = () => {
    if (!news.title || news.title.trim() === "") {
      setTitleError(true);
      return;
    }

    if (!news.description || news.description.trim() === "") {
      setDescriptionError(true);
      return;
    }

    setLoading(true);

    const postAct = () => {
      setLoading(false);
      setNews({
        title: "",
        description: "",
      });
      setTitleError(false);
      setDescriptionError(false);
      modalInfo.onClose();
      modalInfo.onRefresh();
      setAlertMessage(SystemAlertConstants.UpdateNewsSuccessConstant);
    };

    if (news) {
      NewsDataService.updateNews(modalInfo.newsId!, news)
        .then(postAct)
        .catch(() => {
          setLoading(false);
          setAlertMessage(SystemAlertConstants.UpdateNewsErrorConstant);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (modalInfo.showModal && modalInfo.newsId) {
        try {
          const response = await NewsDataService.getNewsById(modalInfo.newsId);
          setNews(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [modalInfo.showModal, modalInfo.newsId]);

  return (
    <>
      <ContainerLoader Loading={loading}>
        <MuiMaterial.Dialog open={modalInfo.showModal} maxWidth={'md'} fullWidth>
          <MuiMaterial.DialogTitle>
            Редактирование новости
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
              <MuiMaterial.TextField
                label="Заголовок"
                variant="standard"
                size="medium"
                value={news.title}
                onChange={handleTitleChange}
                error={titleError}
                helperText={titleError && "Поле не может быть пустым"}
              />

              <MuiMaterial.FormControl error={descriptionError}>
                <MuiMaterial.FormLabel>Описание</MuiMaterial.FormLabel>
                <HtmlEditor 
                    onChange={handleDescriptionChange} 
                    value={news.description}
                />
                <MuiMaterial.FormHelperText>{descriptionError && "Поле не может быть пустым"}</MuiMaterial.FormHelperText>
              </MuiMaterial.FormControl>

              <MuiMaterial.Button variant="outlined" onClick={onSaveNews}>
                Сохранить
              </MuiMaterial.Button>
            </MuiMaterial.Stack>
          </MuiMaterial.DialogContent>
        </MuiMaterial.Dialog>
      </ContainerLoader>
    </>
  );
};

export default NewsEditModal;
