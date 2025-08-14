import React from 'react'

const NewsCard = ({item}) => {
  return (
    <div key={item.id} className="news-item">
        <h3 className="news-item-title">{item.title}</h3>
        <p className="news-item-body">{item.body}</p>
    </div>
  )
}

export default NewsCard