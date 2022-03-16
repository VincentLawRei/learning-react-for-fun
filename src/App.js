import React, {useEffect, useState} from 'react'
import './styles/App.css'
import {PostList} from './components/PostList';
import {PostForm} from './components/PostForm';
import {PostFilter} from './components/PostFilter';
import MyModal from "./components/UI/MyModal/MyModal";
import {MyButton} from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])

    const [modal, setModal] = useState(false)
    const [filter, setFilter] = useState({sort: '', query: ''})
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        console.log('Doing something')
        const posts = await PostService.getAll()
        setPosts(posts)
    })

    useEffect(() => {
        fetchPosts()
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className="App">
            <button onClick={fetchPosts}>GET POSTS</button>
            <MyModal visible={modal}
                     setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <PostFilter filter={filter}
                        setFilter={setFilter}/>

            {postError &&
                <h1>Произошла ошибка: ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader/></div>
                : <PostList remove={removePost}
                            posts={sortedAndSearchedPosts}
                            title={'Список постов'}/>
            }

            <MyButton style={{marginTop: "15px"}}
                      onClick={() => setModal(true)}>
                Написать пост
            </MyButton>

            <hr style={{margin: "25px"}}/>

            {/*<OtherForm create={createPost}/>*/}
        </div>
    )
}

export default App;