import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CssBaseline, StyledEngineProvider } from '@mui/material'
import {ClerkProvider} from "@clerk/clerk-react"
import { BrowserRouter } from "react-router-dom"
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log(PUBLISHABLE_KEY);
if(!PUBLISHABLE_KEY){
  throw new Error("pusblishable key is missing")
}

const queryclient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={"/"}>
      <QueryClientProvider client={queryclient}>
        <StyledEngineProvider injectFirst>
          <CssBaseline/>
            <App />
        </StyledEngineProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </BrowserRouter>
)