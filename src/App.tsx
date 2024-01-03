import { RecoilRoot } from 'recoil';
import AppThemeProvider from './utils/AppThemeProvider';
import AppRouter from './AppRouter';
import SystemAlert from './components/SystemAlert';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <RecoilRoot>
      <AppThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <>
            <SystemAlert />
            <AppRouter/>
          </>
        </SnackbarProvider>
      </AppThemeProvider>
    </RecoilRoot>
  )
}

export default App
