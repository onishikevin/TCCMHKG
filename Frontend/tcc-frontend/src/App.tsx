import './styles/App.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/global/SidebarMenu';
import Topbar from './components/global/Topbar';
import GraphVisualizer from './pages/graphVisualizer';

const App = () => {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<GraphVisualizer />} />
              {/* <Route path="/about" element={<About />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
