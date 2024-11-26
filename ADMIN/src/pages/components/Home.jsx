import React from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import '../css/home.css';
function Home(){
    return (
        <div className="homePage">
            <Nav />
            <div className="adminContainer">
                <SideBar />
                <div className="mainContent">
                    <h1>Chào mừng, Admin!</h1>
                </div>
            </div>
            
        </div>
    );
}
export default Home;