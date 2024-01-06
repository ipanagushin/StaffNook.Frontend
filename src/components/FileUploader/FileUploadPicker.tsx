import React, { useEffect, useState } from 'react';
import FileStorageService from '@/services/FileStorageService';
import ImageFilePreview from './ImageFilePreview';
import FileUpload from './FileUpload';
import * as MuiMaterial from "@mui/material";
import { IFileDto, FileStorageBucketEnum } from '@/models/FileStorageModels';

export interface IFileDtoFile {
    fileDto: IFileDto,
    file?: File
}

interface IFileWithId{
  Id: string,
  FileBlob: File
}

interface FileUploaderProps {
    maxFiles: number;
    filePath: string;
    acceptType: string;
    onChange: (files: IFileDto[]) => void;
    Files?: IFileDto[]
}

const FileUploadPicker: React.FC<FileUploaderProps> = ({ maxFiles, acceptType, filePath, onChange: onChange, Files }) => {
  const [files, setFiles] = useState<IFileWithId[]>([]);
  const [selectedImages, setSelectedImages] = useState<IFileDto[]>(Files || []);

  useEffect(()=>{
    onChange(selectedImages);
  }, [files])

  const handleFileUpload = (file: File) => {
    const uploadFile = async () =>{
        const result = await FileStorageService.upload(filePath, FileStorageBucketEnum.Temp, file);
        const fileDtoFile: IFileWithId = {
          FileBlob:file,
          Id: result.data.id
        }
        setSelectedImages(prevFiles => [...prevFiles, result.data]);
        setFiles(prevFiles => [...prevFiles, fileDtoFile]);
    }

      uploadFile().catch(console.error);
  };

  const handleFileDelete = (file: IFileDto) => {
    const deleteFile = async () =>{
      await FileStorageService.delete(file.id, true);
      setFiles(files.filter(x => x.Id !== file.id));
      setSelectedImages(selectedImages.filter(x => x.id !== file.id));
    }

    deleteFile().catch(console.error);
  };

  return (
    <MuiMaterial.Box sx={{
      display:'flex', 
      justifyContent:'center', 
      alignItems:'center', 
      textAlign:'center',
      flexDirection: 'row'
    }}>
        <FileUpload selectedFiles={selectedImages} acceptType={acceptType} maxFiles={maxFiles} onFileUpload={handleFileUpload} />
        <div>
          {selectedImages.map((file) => (
            <ImageFilePreview key={file.id} file={file} onDelete={handleFileDelete} />
          ))}
        </div>
    </MuiMaterial.Box>
  );
};

export default FileUploadPicker;

