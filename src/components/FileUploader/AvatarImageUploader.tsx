import React, { useEffect, useState } from 'react';
import FileStorageService from '@/services/FileStorageService';
import ImageFilePreview from './ImageFilePreview';
import FileUpload from './FileUpload';
import * as MuiMaterial from "@mui/material";
import ReactAvatarEditor from 'react-avatar-editor';
import { FileStorageBucketEnum, IFileDto } from '@/models/FileStorageModels';

export interface IFileDtoFile {
    fileDto: IFileDto,
    file?: File
}

interface IFileWithId {
  Id: string,
  FileBlob: File
}

interface FileUploaderProps {
    filePath: string;
    onChange: (files: IFileDto[]) => void;
    Files?: IFileDto[]
}

const AvatarImageUploader: React.FC<FileUploaderProps> = ({ filePath, onChange: onChange, Files }) => {
  const [files, setFiles] = useState<IFileWithId[]>([]);
  const [selectedImages, setSelectedImages] = useState<IFileDto[]>(Files || []);
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editor, setEditor] = useState<ReactAvatarEditor | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(()=>{
    onChange(selectedImages);
  }, [files])

  const handleFileUpload = (file: File) => {
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setOpen(true);
  };

  const handleFileDelete = (file: IFileDto) => {
    const deleteFile = async () =>{
      await FileStorageService.delete(file.id, true);
      setFiles(files.filter(x => x.Id !== file.id));
      setSelectedImages(selectedImages.filter(x => x.id !== file.id));
    }

    deleteFile().catch(console.error);
  };

  const handleImageSave = () => {
    const uploadFile = async (file: File) =>{
      const result = await FileStorageService.upload(filePath, FileStorageBucketEnum.Temp, file);
      const fileDtoFile: IFileWithId = {
        FileBlob:file,
        Id: result.data.id
      }
      setSelectedImages(prevFiles => [...prevFiles, result.data]);
      setFiles(prevFiles => [...prevFiles, fileDtoFile]);
    }

    if (editor && selectedImage) {
      const canvas = editor.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], selectedImage.name, {type: selectedImage.type});
          setOpen(false);
          uploadFile(file).catch(console.error);
          setOpen(false);
        }
      }, selectedImage.type);
    }
  };

  const handleScaleChange = (event: Event, value: number | number[], activeThumb: number) => {
    setScale(value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <MuiMaterial.Box sx={{
      display:'flex', 
      justifyContent:'center', 
      alignItems:'center', 
      textAlign:'center',
      flexDirection: 'row'
    }}>
        <FileUpload selectedFiles={selectedImages} acceptType={'image/*'} maxFiles={1} onFileUpload={handleFileUpload} />
        <div>
          {selectedImages.map((file) => (
            <ImageFilePreview key={file.id} file={file} isAvatar onDelete={handleFileDelete} />
          ))}
        </div>
    </MuiMaterial.Box>
    <MuiMaterial.Dialog open={open} onClose={handleClose}>
        <MuiMaterial.DialogTitle>Изменение фото</MuiMaterial.DialogTitle>
        <MuiMaterial.DialogContent>
          {previewImage && (
            <ReactAvatarEditor
              ref={(ref) => setEditor(ref)}
              image={previewImage}
              width={350}
              height={350}
              border={80}
              borderRadius={200}
              color={[0, 0, 0, 0.6]} // RGBA
              scale={scale}
              rotate={0}
            />
          )}
          <MuiMaterial.Slider
            value={scale}
            min={1}
            max={3}
            step={0.1}
            onChange={handleScaleChange}
          />
        </MuiMaterial.DialogContent>
        <MuiMaterial.DialogActions>
          <MuiMaterial.Button onClick={handleClose}>Отмена</MuiMaterial.Button>
          <MuiMaterial.Button variant="text" color="primary" onClick={handleImageSave}>
            Сохранить
          </MuiMaterial.Button>
        </MuiMaterial.DialogActions>
      </MuiMaterial.Dialog>
    </>
  );
};

export default AvatarImageUploader;

