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

function App() {
    const [posts, setPosts] = useState([
        {id: 1, title: 'Javascript', body: 'Aescription'},
        {id: 2, title: 'Aavascript 2', body: 'Kescription'},
        {id: 3, title: 'Cavascript 3', body: 'Eescription'},
    ])

    const [modal, setModal] = useState(false)
    const [filter, setFilter] = useState({sort: '', query: ''})
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const [isPostsLoading, setIsPostsLoading] = useState(false)

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

    async function fetchPosts() {
        setIsPostsLoading(true)
        setTimeout(async () => {
            const posts = await PostService.getAll()
            setPosts(posts)
            setIsPostsLoading(false)
        }, 1000)
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