import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './lib/AuthContext'
import { ThemeProvider } from './lib/ThemeContext'
import { ToastProvider } from './lib/ToastContext'
import { ProfessorDataProvider } from './lib/ProfessorDataContext'
import { ProtectedRoute } from './components/ProtectedRoute'
import { ProfessorLayout } from './layouts/ProfessorLayout'
import { LoginPage } from './pages/LoginPage'
import { AulasTab } from './features/aulas/AulasTab'
import { FinanceiroTab } from './features/financeiro/FinanceiroTab'
import { AnaliseTab } from './features/analise/AnaliseTab'
import { MateriaisTab } from './features/materiais/MateriaisTab'
import { AvisosTab } from './features/avisos/AvisosTab'
import { FichasClienteTab } from './features/fichas-cliente/FichasClienteTab'
import { ContratosTab } from './features/contratos/ContratosTab'
import { RecursosTab } from './features/recursos/RecursosTab'
import { CanvasTab } from './features/canvas/CanvasTab'
import { CanvasQuadroPage } from './features/canvas/CanvasQuadroPage'
import { MinhaAreaTab } from './features/minha-area/MinhaAreaTab'
import { CertificacoesTab } from './features/certificacoes/CertificacoesTab'
import { PerfilTab } from './features/perfil/PerfilTab'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route
                element={
                  <ProtectedRoute>
                    <ProfessorDataProvider>
                      <ProfessorLayout />
                    </ProfessorDataProvider>
                  </ProtectedRoute>
                }
              >
                <Route path="/painel/aulas" element={<AulasTab />} />
                <Route path="/painel/financeiro" element={<FinanceiroTab />} />
                <Route path="/painel/analise" element={<AnaliseTab />} />
                <Route path="/painel/materiais" element={<MateriaisTab />} />
                <Route path="/painel/avisos" element={<AvisosTab />} />
                <Route path="/painel/fichas-cliente" element={<FichasClienteTab />} />
                <Route path="/painel/contratos" element={<ContratosTab />} />
                <Route path="/painel/recursos" element={<RecursosTab />} />
                <Route path="/painel/canvas" element={<CanvasTab />} />
                <Route path="/painel/canvas/:id" element={<CanvasQuadroPage />} />
                <Route path="/painel/perfil" element={<PerfilTab />} />
                <Route path="/painel/minha-area" element={<MinhaAreaTab />} />
                <Route path="/painel/certificacoes" element={<CertificacoesTab />} />
                <Route path="/painel" element={<Navigate to="/painel/aulas" replace />} />
              </Route>

              <Route path="/" element={<Navigate to="/painel/aulas" replace />} />
              <Route path="*" element={<Navigate to="/painel/aulas" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
