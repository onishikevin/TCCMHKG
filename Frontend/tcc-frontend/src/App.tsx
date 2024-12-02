import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/global/SidebarMenu';
import Topbar from './components/global/Topbar';
import GraphVisualizer from './pages/graphVisualizer';
import { useState } from 'react';

const App = () => {
  const [theme, colorMode] = useMode();
  const [resetKey, setResetKey] = useState<number>(0);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar setResetKey={setResetKey} resetKey={resetKey} />
            <Routes>
              <Route path="/" element={<GraphVisualizer key={resetKey} />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
