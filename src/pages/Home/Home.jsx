import React from 'react';

import Carousel from "./components/Carousel";
import News from "./components/News";
import EducationSubject from "./components/EducationSubject";
import ForTeachers from "./components/ForTeachers";
import ForPupils from "./components/ForPupils";
// import Books from "./components/Books";
import Quotes from "./components/Quotes";
import ForParents from "./components/ForParents";

import "./home.less";

function Home() {
    return (
        <React.Fragment>
            <Carousel />
            <News />
            <EducationSubject />
            <ForTeachers />
            <ForPupils />
            {/* <Books /> */}
            <Quotes />
            <ForParents />
        </React.Fragment>
    )
}

export default Home;