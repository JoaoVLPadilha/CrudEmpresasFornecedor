import React, { useCallback, useContext } from 'react';
import { createContext} from 'react';
import { ThemeProvider } from '@emotion/react';
import { DarkTheme, LightTheme } from '../themes/index';
import { Box } from '@mui/system';

interface IThemeContextData {
   themeName: 'light' | 'dark';
   toggleTheme: () => void;
}

type Props = {
   children?: JSX.Element[] | React.ReactElement;
};

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return React.useContext(ThemeContext)
}

export const AppThemeProvider: React.FC<Props> = ({ children }) => {
   const [themeName, setThemeName] = React.useState<'light' | 'dark'>('dark');

   const toggleTheme = useCallback(() => {
      setThemeName((oldThemeName) =>
         oldThemeName === 'light' ? 'dark' : 'light',
      );
   }, []);

    const theme = React.useMemo(() => {
      return themeName === 'light' ? LightTheme : DarkTheme;
   }, [themeName]);

   return (
      <ThemeContext.Provider value={{ themeName, toggleTheme }}>
         <ThemeProvider theme={theme}>
            <Box
               width="100vw"
               height="100vh"
               bgcolor={theme.palette.background.default}
               sx={{color: theme.palette.text.primary}}
            >
               {children}
            </Box>
         </ThemeProvider>
      </ThemeContext.Provider>
   );
};
