import { ReactElement, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { appThemeMode } from '../common/AppAtoms';
import { Theme } from '@mui/material/styles';
import darkScrollbar from '@mui/material/darkScrollbar'

interface Props {
  children: ReactElement;
}

function AppThemeProvider({ children }: Props): ReactElement {
  const mode = useRecoilValue(appThemeMode);
  const theme: Theme = useMemo(() =>
      createTheme({
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              body: themeParam.palette.mode === 'dark' ? darkScrollbar() : null,
            }),
          },
        },
        palette: {
          mode,
          // secondary: {
          //   main: '#EB9612CC',
          // },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppThemeProvider;