import { Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Header from "../components/header"
import '../styles/header.css'

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