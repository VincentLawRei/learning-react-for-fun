import React from 'react'
import {MyInput} from './UI/input/MyInput'
import {MySelect} from './UI/select/MySelect'

export const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
            <MyInput value={filter.query}
                     onChange={e => setFilter({...filter, query: e.target.value})}/>
            <MySelect value={filter.sort}
                      onChange={selectedSort => setFilter({...filter, post: selectedSort})}
                      defaultValue={"Сортировка"}
                      options={[
                          {value: 'title', name: 'По названию'},
                          {value: 'body', name: 'По описанию'},
                      ]}/>
        </div>
    )
}
