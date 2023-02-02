import Navbar from "./Navbar"


export default function Layout({ children }: any) {
    return (
        <div className="grid grid-rows-layout min-h-screen">
            <Navbar />
            {children}
        </div>
    )
}