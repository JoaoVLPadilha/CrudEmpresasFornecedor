import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import LeftDrawer from './shared/components/left-drawer/LeftDrawer';
import { AppThemeProvider } from './shared/context';
import DrawerProvider from './shared/context/DrawerContext';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppThemeProvider>
        <BrowserRouter>
          <DrawerProvider>
            <LeftDrawer>
              <AppRoutes />
            </LeftDrawer>
          </DrawerProvider>
        </BrowserRouter>
      </AppThemeProvider>
    </>
  );
}

export default App;
