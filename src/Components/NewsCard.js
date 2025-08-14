import React from 'react'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'

const NewsCard = ({item}) => {
  return (
    <div key={item.id} className="news-item">
        <h3 >
            <a className="news-item-title" target="_blank" href={`https://dummyjson.com/posts/${item.id}`}>
                {item.title}
            </a>
        </h3>
        <div className="tags">
            {item.tags.map((tag, index) => (
                '#' + tag + ' '
            ))}
        </div>
        <p className="news-item-body">{item.body}</p>
        <div className="reactions">
            <span className="reaction">
                <LikeOutlined />
                {` ${item.reactions.likes}`}
            </span>
            <span className="reaction">
                <DislikeOutlined />
                {` ${item.reactions.dislikes}`}
            </span>
        </div>        
    </div>
  )
}

export default NewsCard