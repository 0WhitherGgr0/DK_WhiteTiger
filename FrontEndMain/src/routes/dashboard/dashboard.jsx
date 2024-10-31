import { Outlet } from "react-router-dom"
import Footer from "../../layout/footer"
import Header from "../../layout/header"
import '../../styles/header.css'

export default function Dashboard(){
    return (
        <>
            <Header/>
            <div className="contentBlock">
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}