import React, { useState } from 'react'

function App() {
  const [inputLink, setInputLink] = useState('')
  const [convertedLink, setConvertedLink] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const handleChange = (event) => {
    const { value } = event.target
    setInputLink(value)
    convertLink(value)
  }

  const convertLink = (raw) => {
    if (raw.startsWith('webcal://')) {
      setConvertedLink(raw.replace('webcal://', 'https://'))
    } else {
      setConvertedLink(raw)
    }
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setInputLink(text)
      convertLink(text)
      showToastMessage('Pasted link from clipboard!')
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }

  const handleCopyToClipboard = async () => {
    if (!convertedLink) return
    try {
      await navigator.clipboard.writeText(convertedLink)
      showToastMessage('Copied the link successfully!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const showToastMessage = (message) => {
    setToastMessage(message)
    setShowToast(true)
    // Hide toast after 2 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }

  return (
    <div className="app">
      {showToast && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
      <h1>Webcal Link Generator</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Paste or type your webcal:// link here"
          value={inputLink}
          onChange={handleChange}
        />
        <button onClick={handlePasteFromClipboard}>
          <img src="/img/paste.svg" alt="Paste" />
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          readOnly
          value={convertedLink}
          placeholder="Converted link will appear here"
        />
        <button onClick={handleCopyToClipboard}>
          <img src="/img/copy.svg" alt="Copy" />
        </button>
      </div>
    </div>
  )
}

export default App
