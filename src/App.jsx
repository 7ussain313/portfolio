import { ThemeProvider } from './context/ThemeContext'
import NewDesign from './components/NewDesign'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <NewDesign />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
