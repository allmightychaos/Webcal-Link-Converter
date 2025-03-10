import React, { useState } from 'react'

function App() {
  const [inputLink, setInputLink] = useState('')
  const [convertedLink, setConvertedLink] = useState('')

  const handleChange = (event) => {
    const { value } = event.target
    setInputLink(value)
    if (value.startsWith('webcal://')) {
      setConvertedLink(value.replace('webcal://', 'https://'))
    } else {
      setConvertedLink(value)
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputLink(text)
      if (text.startsWith('webcal://')) {
        setConvertedLink(text.replace('webcal://', 'https://'))
      } else {
        setConvertedLink(text)
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(convertedLink)
      alert('Copied!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div style={styles.container}>
      <h1>Webcal Link Converter</h1>
      <div style={styles.inputContainer}>
        <button onClick={handlePasteFromClipboard} style={styles.btn}>
          Paste
        </button>
        <input
          type="text"
          placeholder="Paste or type your webcal:// link here"
          value={inputLink}
          onChange={handleChange}
          style={styles.inputField}
        />
      </div>
      <div style={styles.outputContainer}>
        <input
          type="text"
          readOnly
          value={convertedLink}
          placeholder="Converted link will appear here"
          style={styles.inputField}
        />
        <button onClick={handleCopyToClipboard} style={styles.btn}>
          Copy
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  outputContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputField: {
    width: '300px',
    padding: '8px',
    margin: '0 10px'
  },
  btn: {
    padding: '8px 16px',
    cursor: 'pointer'
  }
}

export default App
