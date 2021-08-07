import styled from "styled-components";

import { News } from "../types";

const List = styled.ul`
    padding: 0 50px;
    color: rgb(34, 34, 34); 
`;

const Item = styled.li`
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid rgb(135, 138, 140);
    list-style: none;
    font-size: 15px;
`;

const Link = styled.a`
    color: rgb(34, 34, 34);
    text-decoration: inherit;
    &:hover {
        text-decoration: underline;
    }
`;

const NewsFeedList = (props: { news: News[] }) => {

    if (props.news) {
        const listItems = props.news.map((item: News, index) =>
            <Item key={index}>
                <Link href={item.Href}>{item.Description}</Link>
            </Item>
        );

        return (
            <List>{listItems}</List>
        );
    }

    return (
        <div>no data</div>
    );
}

export default NewsFeedList;