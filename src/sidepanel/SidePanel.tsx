import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../../index.css';
import ChatWindow from './ChatWindow';
import { Provider } from '@/components/ui/provider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <ChatWindow />
    </Provider>
  </StrictMode>
);
