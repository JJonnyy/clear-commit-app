import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <App />
        </MantineProvider>
    </BrowserRouter>
)
