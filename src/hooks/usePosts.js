import {useMemo} from "react";

export const useSortedPosts = (posts, sort) => {
    // useMemo позволяет кэшировать те или иные значения
    // Отслеживает изменения лишь в случае изменения
    // selectedSort или posts
    const sortedPosts = useMemo(() => {
        console.log('Функция sortedPosts с useMemo сработала!');
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts])

    return sortedPosts;
};

export const usePosts = (posts, sort, query) => {
    const sortedPosts = useSortedPosts(posts, sort)

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
};