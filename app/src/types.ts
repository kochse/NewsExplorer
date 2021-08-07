interface News {
    Description: string;
    Href: string;
}

interface State {
    news: News[]
}

export type { News, State }