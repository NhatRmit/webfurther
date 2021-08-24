import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux'
import Post from './Post/Post'

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts)

  if (!posts.length && !isLoading) return 'No posts'

  return (
    isLoading ? <CircularProgress /> : (
      <div className="row mx-xl-4">
          {posts.map((post) => (
            <div key={post._id} className="col-lg-4 col-md-6">
              <div id="eachCar" className="container my-4">
                <Post post={post} setCurrentId={setCurrentId} />
              </div>
            </div>
          ))}
      </div>
    )
  )
}

export default Posts
