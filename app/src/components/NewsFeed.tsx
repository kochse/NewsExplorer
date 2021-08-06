import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios from 'axios';

import NewsFeedList from "./NewsFeedList"

const Title = styled.h3`
    text-align: center;
`;

const NewsFeed = (props: {title: String}) => {
    const [data, setData] = useState({ news: [] })

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://europe-west1-scraper1-321417.cloudfunctions.net/HelloWorld'
            )
    
            setData(result.data);
        }
        fetchData();
    });

    return (
        <div>
            <Title>{props.title}</Title>
            <NewsFeedList news={data.news}></NewsFeedList>
        </div>
    );
}

export default NewsFeed;