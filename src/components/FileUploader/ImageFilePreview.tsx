import React from "react";
import { Avatar, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IFileDto } from "@/models/FileStorageModels";

interface ImageFilePreviewProps {
  file: IFileDto;
  onDelete: (file: IFileDto) => void;
  isAvatar?: boolean;
}

const ImageFilePreview: React.FC<ImageFilePreviewProps> = ({ file, onDelete, isAvatar }) => {
  const handleDelete = () => {
    onDelete(file);
  };

  return (
      <div style={{ position: 'relative', padding: '10px', display: 'inline-block', whiteSpace: 'nowrap', marginRight: '10px' }}>
        {isAvatar ? (
            <Avatar
                sx={{
                    m:1,
                    width: '130px',
                    height: '130px',
                }}
                src={file.previewUrl}
            />
        ) : (
            <img src={file.previewUrl} style={{ maxWidth: '250px', maxHeight: '250px' }} alt="Предпросмотр фото" />
        )}

        <IconButton onClick={handleDelete} aria-label="Удалить" style={{ position: 'absolute', top: '5px', right: '5px', color: 'red' }}>
          <DeleteIcon />
        </IconButton>
      </div>
  );
};

export default ImageFilePreview;
