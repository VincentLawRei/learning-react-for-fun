import React, { useState, useRef, useMemo } from 'react'
import './styles/App.css'
import ClassCounter from './components/ClassCounter';
import { Counter } from './components/Counter'
import { MyButton } from './components/UI/button/MyButton';
import { MyInput } from './components/UI/input/MyInput';
import { PostItem } from './components/PostItem';
import { PostList } from './components/PostList';
import { PostForm } from './components/PostForm';
import { MySelect } from './components/UI/select/MySelect';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Javascript', body: 'Aescription' },
        { id: 2, title: 'Aavascript 2', body: 'Kescription' },
        { id: 3, title: 'Cavascript 3', body: 'Eescription' },
    ])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const [selectedSort, setSelectedSort] = useState('')
    // useMemo позволяет кэшировать те или иные значения
    // Отслеживает изменения лишь в случае изменения 
    // selectedSort или posts
    const sortedPosts = useMemo(() => {
        console.log('Функция sortedPosts с useMemo сработала!');
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
        }

        return posts
    }, [selectedSort, posts])

    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }

    const [searchQuery, setSearchQuery] = useState('')


    return (
        <div className="App">
            {/* <Counter />
			<ClassCounter /> */}
            <PostForm create={createPost} />

            <div>
                <MyInput value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <MySelect value={selectedSort} onChange={sortPosts} defaultValue={"Сортировка"} options={[
                    { value: 'title', name: 'По названию' },
                    { value: 'body', name: 'По описанию' },
                ]} />
            </div>

            {posts.length !== 0
                ? <PostList remove={removePost} posts={sortedPosts} title={'Список постов'} />
                : <h1 style={{ textAlign: "center" }}>Посты не были найдены!</h1>
            }
        </div>
    );
}

export default App;