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
        <DrawerProvider>
          <LeftDrawer>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </LeftDrawer>
        </DrawerProvider>
      </AppThemeProvider>
    </>
  );
}

export default App;
