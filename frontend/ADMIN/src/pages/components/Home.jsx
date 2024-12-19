import React from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import RevenueChart from "./RevenueChart";
import CustomerChart from "./CustomerChart";
import '../css/components/home.css';

function Home(){
    return (
        <div className="home-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <h1>Chào mừng, Admin!</h1>
                    <RevenueChart />
                    <CustomerChart />
                </div>
            </div>
            
        </div>
    );
}

export default Home;