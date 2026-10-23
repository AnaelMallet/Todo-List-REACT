import { useModal } from "./modalProvider"

type Modal = {
    title: string
    description: string
    function: () => any
}

export default function Modal(props: Modal) {
    const { closeModal } = useModal()
    const {
        title,
        description,
        function: callback
    } = props

    return (
        <main className="absolute flex place-content-center place-items-center w-full h-full bg-black/40 z-50 text-white">
            <section data-testid="popupElement" className="bg-[#282c34] grid grid-cols-1 gap-y-10 w-1/3 rounded-lg text-white">
                <div className="grid grid-cols-1 px-10 gap-y-5 pt-5">
                    <p className="text-3xl font-bold">{title}</p>
                    <hr/>
                    <p className="font-bold">{description}</p>
                </div>
                <p className="flex justify-center text-white pb-6 space-x-10 text-lg">
                    <button data-testid="confirmPopupButton" className="bg-cyan-400 font-bold hover:bg-cyan-500 rounded-md p-2" onClick={callback}>Confirmer</button>
                    <button data-testid="cancelPopupButton" className="font-bold p-2 border-white hover:bg-[#181c24] border-2 rounded-md" onClick={closeModal}>Annuler</button>
                </p>
            </section>
        </main>
    )
}