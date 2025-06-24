import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App.jsx'
import { SidebarProvider } from '@/context/SidebarContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </Provider>
  </StrictMode>,
)
