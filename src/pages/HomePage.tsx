import * as MuiMaterial from "@mui/material";
import PrivateLayout from "../components/Layouts/PrivateLayout";
import NewsList from "@/components/News/NewsList";
import Calendar from "@/components/Calendar/Calendar";

const mockNews = [
  {
    id: 1,
    title: 'Новость 1',
    content: 'Содержание новости 1. Больше текста для описания события с возможностью переносов строки. Еще больше текста для описания события с возможностью переносов строки. Еще больше текста для описания события с возможностью переносов строки.',
    image: 'https://placekitten.com/200/301',
    author: {
      name: 'Автор 1',
      avatar: 'https://placekitten.com/100/100',
    },
  },
  {
    id: 2,
    title: 'Новость 2',
    content: 'Содержание новости 2. Еще больше текста о произошедшем событии с возможностью переносов строки. Еще больше текста о произошедшем событии с возможностью переносов строки.',
    image: 'https://placekitten.com/200/300',
    author: {
      name: 'Автор 2',
      avatar: 'https://placekitten.com/100/100',
    },
  },
  // Добавьте другие новости по необходимости
];

const HomePage = () => {
    return (
    <>
        <PrivateLayout>
          <MuiMaterial.Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            minHeight: '100vh'
          }}>
            {/* <MuiMaterial.Typography variant="h1">
              WIP
            </MuiMaterial.Typography>
            <MuiMaterial.Button href="/my-reports" size="large" variant="outlined">
                Мои отчеты
            </MuiMaterial.Button> */}
            <Calendar/>
            <NewsList news={mockNews} />
          </MuiMaterial.Box>
        </PrivateLayout>
    </>);
    }
export default HomePage;