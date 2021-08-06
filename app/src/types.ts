interface News {
    title: string;
    href: string;
}

interface State {
    news: News[]
}

export type { News, State }