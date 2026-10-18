import { ThemeProvider } from './context/ThemeContext'
import NewDesign from './components/NewDesign'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <NewDesign />
      <div className="legacy dark relative z-[1]">
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
