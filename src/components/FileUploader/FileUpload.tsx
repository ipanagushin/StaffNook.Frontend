import { Button } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UploadAlertDialog from "./UploadAlertDialog";
import { IFileDto } from "@/models/FileStorageModels";

interface FileUploadProps {
    maxFiles: number;
    acceptType: string;
    selectedFiles: IFileDto[];
    onFileUpload: (file: File) => void;
}
  
const FileUpload: React.FC<FileUploadProps> = ({ maxFiles, acceptType, selectedFiles, onFileUpload }) => {
    const [modalIsOpened, setModalIsOpened] = useState(false);
    const inputFileRef = useRef<HTMLInputElement | null>(null); // Ссылка на input элемент
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
        const newFiles = Array.from(event.target.files);
        if (selectedFiles.length + newFiles.length <= maxFiles) {
          onFileUpload(newFiles[0]);
        } else {
            setModalIsOpened(true);
        }
      }

      // Сбрасываем значение input file, чтобы событие onChange сработало при следующем выборе того же файла
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
    };

    const handleAlertClose = () => {
        setModalIsOpened(false);
    };
  
    return (
      <div>
        <UploadAlertDialog isOpened={modalIsOpened} handleClose={handleAlertClose} text={`Вы можете прикрепить только до ${maxFiles} файлов.`}/>
        <Button
            disabled={selectedFiles.length === maxFiles}
            component="label"
            variant="outlined"
            startIcon={<UploadFileIcon />}
        >
            Загрузить
            <input ref={inputFileRef} type="file" accept={acceptType} hidden onChange={handleFileChange} />
        </Button>
      </div>
    );
  };

  export default FileUpload;