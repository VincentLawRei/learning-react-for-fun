import React, {useMemo, useState} from 'react'
import './styles/App.css'
import {PostList} from './components/PostList';
import {PostForm} from './components/PostForm';
import {PostFilter} from './components/PostFilter';
import OtherForm from "./components/OtherForm";

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Aescription'},
        {id: 2, title: 'Aavascript 2', body: 'Kescription'},
        {id: 3, title: 'Cavascript 3', body: 'Eescription'},
    ])

    const [filter, setFilter] = useState({sort: '', query: ''})

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    // useMemo позволяет кэшировать те или иные значения
    // Отслеживает изменения лишь в случае изменения
    // selectedSort или posts
    const sortedPosts = useMemo(() => {
        console.log('Функция sortedPosts с useMemo сработала!');
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [filter.query, sortedPosts])


    return (
        <div className="App">
            <PostForm create={createPost}/>
            <PostFilter filter={filter}
                        setFilter={setFilter}/>
            {sortedAndSearchedPosts.length !== 0
                ? <PostList remove={removePost}
                            posts={sortedAndSearchedPosts}
                            title={'Список постов'}/>
                : <h1 style={{textAlign: "center"}}>Посты не были найдены!</h1>
            }

            <hr style={{margin: "25px"}}/>

            {/*<OtherForm create={createPost}/>*/}
        </div>
    )
}

export default App;