import { useState } from 'react'
import { EditNoteContext } from './AllContexts'

const EditContextProvider = ({children}) => {
    const [editNote , setEditNote] = useState(null)
  return (
    <EditNoteContext.Provider value={{editNote , setEditNote}}>
      {children}
    </EditNoteContext.Provider>
  )
}

export default EditContextProvider