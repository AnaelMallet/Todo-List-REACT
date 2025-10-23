import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"

import { getSessionStorage, setSessionStorage } from "../utils"

type SelectListType = {
    selectedList: string,
    setSelectedList: Dispatch<SetStateAction<string>>
}

export const SelectListContext = createContext<SelectListType>({} as SelectListType)

export function useSelectList() {
    return useContext(SelectListContext)
}

export default function SelectListProvider(props: any) {
      const [ selectedList, setSelectedList ] = useState<string>(
    () => getSessionStorage("selectedList")
  )

  useEffect(() => {
    setSessionStorage("selectedList", selectedList)
  }, [selectedList])

  return (
    <SelectListContext.Provider value={{ selectedList, setSelectedList }}>
    {props.children}
    </SelectListContext.Provider>
  )
}