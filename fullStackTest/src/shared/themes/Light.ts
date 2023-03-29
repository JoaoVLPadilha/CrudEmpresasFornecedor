import { createTheme } from '@mui/material';
import { red, blue, yellow, lime,  } from '@mui/material/colors';
// Criando um tema novo com material UI
// Material UI tem diversas bibliotecas dentro dele
// Incluindo componentes, funções e etc.
// Para esse caso precisamos importar o createTheme e usar as configurações dele para criar um tema custom
// Para funcionar esse tema temos que envolver toda aplicação dentro de ThemeProvider como feiton o App.tsx

export const LightTheme = createTheme({


   palette: {
      text:{
         primary:'#000'
      },
      primary: {
         main: red[600],
         dark: red[800],
         light: red[500],
         contrastText: 'white',
      },
      secondary: {
         main: blue[800],
         dark: blue[900],
         light: blue[700],
         contrastText: 'white',
      },
      background: {
         default: '#fff',
         paper:'#E6E6E6',
      },
   },
   typography: {
      
      allVariants: {
        color: '#000'
      }
   }
});
