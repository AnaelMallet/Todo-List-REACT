import { createContext, useContext, useState } from "react"
import Modal from "./modal"

type ModalContextType = {
    openModal: (props: ModalType) => void
    closeModal: () => void
}

export const ModalContext = createContext<ModalContextType>({} as ModalContextType)

export function useModal() {
    return useContext(ModalContext)
}

type ModalType = {
    title: string
    description: string
    function: () => any
}

export default function ModalProvider(props: any) {
    const [isOpen, setIsOpen] = useState(false)
    const [modalValues, setModalValues] = useState({
        title: "",
        description: "",
        function: () => {}
    })
    const openModal = (props: ModalType) => {
        setModalValues({
            title: props.title,
            description: props.description,
            function: props.function
        })

        setIsOpen(!isOpen)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {console.log(isOpen)}
            {isOpen ?
                <Modal
                    title={modalValues.title}
                    description={modalValues.description}
                    function={modalValues.function}
                /> :
                <></>
            }
            {props.children}
        </ModalContext.Provider>
    )
}