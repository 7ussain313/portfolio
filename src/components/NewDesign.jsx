import { useEffect } from 'react'
import '../design/new.css'
import bodyHtml from '../design/body.html?raw'
import script from '../design/script.js?raw'

let started = false

// The portfolio's visual layer. Markup, styles and behaviour live in src/design/
// (ported from new.html); the Contact section below it stays the React component.
export default function NewDesign() {
  useEffect(() => {
    if (started) return
    started = true
    new Function(script)()
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
}
