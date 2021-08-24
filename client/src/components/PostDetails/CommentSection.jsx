import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import useStyles from './styles';
import './styles.css'

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'))
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const [reviews, setComments] = useState(post?.comments)
  const classes = useStyles()
  const commentsRef = useRef()

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id))
    setComment('');
    setComments(newComments)
    commentsRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="container mx-5">
      <div className="row">
        
          <label>Write your review</label>
          <textarea 
            className="form-control border-radius w-100" 
            value={comment} 
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        <br />
        <div id="review-btn" className="btn px-3 py-2 my-3" disabled={!comment.length} onClick={handleComment}>
          Submit
        </div>
      </div>
    <div className="overflow-auto h-50">
      {reviews?.map((review, index) => (
        <div key={index}>
          <strong>{review.split(': ')[0]}</strong>
            {review.split(':')[1]}<br />
        </div>
      ))}
      <div ref={commentsRef} />
    </div>
    </div>
  )
}

export default CommentSection
