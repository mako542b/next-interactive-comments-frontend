import LoginForm from "./LoginForm"


export default function ModalLogin ({setModal}: any) {

    return (
        <div className="fixed grid inset-1/4 place-content-center bg-blue-400">
            <LoginForm setModal={setModal}/>
        </div>
    )
}