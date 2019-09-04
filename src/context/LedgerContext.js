import React from "react"

export const LedgerContext = React.createContext({
    contextData: '',
    difference: '',
    dataTransfer: () => {}
  });