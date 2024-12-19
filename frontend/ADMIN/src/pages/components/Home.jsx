import React from "react";
import Nav from './Nav';
import SideBar from './Sidebar';
import Chart_Revenue from "./Chart_Revenue";
import Chart_Customer from "./Chart_Customer";
import '../css/components/home.css';

function Home(){
    return (
        <div className="home-page">
            <Nav />
            <div className="page-container">
                <SideBar />
                <div className="main-content-box">
                    <h1>Chào mừng, Admin!</h1>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                        <Chart_Revenue />
                        <Chart_Customer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;