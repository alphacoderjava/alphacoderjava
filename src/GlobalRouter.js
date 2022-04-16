import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.less';

/* PAGES */
import TopNavbar from './globalComponents/TopNavbar';
import MainHeader from './globalComponents/MainHeader';
import Footer from './globalComponents/Footer';
import NotFound from './pages/NotFound/NotFound';
import Home from "./pages/Home/Home";
import AllList from "./pages/AllList/AllList";
// import BookView from "./pages/BookView/";
import BookViewSubject from "./pages/BookViewSubject/BookViewSubject";
import VideoModal from "./globalComponents/VideoModal";
import AboutUs from "./pages/AboutUs/AboutUs";
import Article from "./pages/Article/Article";
import Rules from "./pages/Rules/Rules";
import SiteMap from "./pages/SiteMap/SiteMap";
import Help from "./pages/Help/Help";

import header_bg from "./assets/img/header_bg.png";
import footer_bg from "./assets/img/footer_bg.png";

function GlobalRouter() {
    return (
        <Router>
            <div className="sticky-header" style={{
                backgroundImage: `url(${header_bg})`,
                backgroundSize: "cover",
            }}>
                <TopNavbar />
                <MainHeader />
            </div>

            <Switch>
                <Route path="/article/:id" children={() => <Article />} />
                <Route path="/book-view-subject/:id" children={() => <BookViewSubject />} />
                {/* <Route path="/book-view/:id" children={() => <BookView />} /> */}
                <Route path="/all-list/:id" children={() => <AllList />} />

                <Route path="/help" children={() => <Help />} />
                <Route path="/site-map" children={() => <SiteMap />} />
                <Route path="/rules" children={() => <Rules />} />
                <Route path="/about-us" children={() => <AboutUs />} />
                <Route exact path="/" children={() => <Home />} />
                <Route children={() => <NotFound />} />
            </Switch>

            <div style={{
                backgroundImage: `url(${footer_bg})`,
                backgroundSize: "cover",
            }}>
                <Footer />
            </div>

            <VideoModal />
        </Router>
    );
}

export default GlobalRouter;