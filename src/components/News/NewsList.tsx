import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Stack,
  Box,
} from '@mui/material';

interface News {
  id: number;
  title: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface NewsListProps {
  news: News[];
}

const NewsList: React.FC<NewsListProps> = ({ news }) => {
  return (
    <List>
      {news.map((item) => (
        <ListItem key={item.id}>
          <Card sx={{maxWidth: '1300px'}}>
            <Stack direction={'row'}>
              <Box sx={{
                 display: 'flex', 
                 flexDirection: 'column', 
                 alignItems: 'center', 
                 justifyContent: 'center',
                 minWidth: '10vh'
              }}>
                <Avatar sx={{width: 50, height: 50}} alt={item.author.name} src={item.author.avatar} />
                <Typography>{item.author.name}</Typography>
              </Box>
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.content}
                </Typography>
                <CardMedia
                  style={{ maxWidth: '500px', maxHeight: '600px' }}
                  component="img"
                  alt={item.title}
                  image={item.image}
                />
            </CardContent>
            </Stack>


            
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default NewsList;