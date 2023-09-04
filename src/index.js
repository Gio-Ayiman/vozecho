import App from './App';
import { createRoot } from 'react-dom/client';
import './index.css';

document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(<App/>);