import React, { useState } from "react"


const OpenProvider = ({ children }) => {
  const [opened, setOpened] = useState(false)
  return (
    <OpenContext.Provider value={[opened, setOpened]}>
      {children}
    </OpenContext.Provider>
  )
}
export default OpenProvider

export const OpenContext = React.createContext()
