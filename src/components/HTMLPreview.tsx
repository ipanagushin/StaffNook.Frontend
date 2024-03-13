import { FC } from 'react';
import { Typography } from '@mui/material';

interface HTMLPreviewProps {
  html?: string;
  maxHeight?: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
  pt?: number
}

const HTMLPreview: FC<HTMLPreviewProps> = ({ html, maxHeight, color, fontSize, fontFamily, pt }) => {
return (
    <Typography
      sx={{
        color: color,
        fontSize: fontSize,
        fontStyle: 'normal',
        lineHeight: 'normal',
        maxHeight: maxHeight,
        fontFamily: fontFamily,
        pt: pt
      }}
      dangerouslySetInnerHTML={{ __html: html ?? '' }}
    />
  );
};

export default HTMLPreview;