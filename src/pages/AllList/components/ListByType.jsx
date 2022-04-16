import React from 'react';

import BookCard from "./BookCard";
import VideoCard from "./VideoCard";
import AudioCard from "./AudioCard";

const ListByType = (props) => {
    const list = props.data;

    switch (props.dataType) {
        case "book":
            return <BookCard list={list} />

        case "video":
            return <VideoCard list={list} />

        case "audio":
            return <AudioCard list={list} />

        default:
            return <BookCard list={list} />
    }
}

export default ListByType;