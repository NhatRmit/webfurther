import React, { useState } from 'react';
import {  Button } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId))
    } else {
      setLikes([...post.likes, userId])
    }
  }

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openPost = () => {
    history.push(`/posts/${post._id}`)
  }

  return (
    <>
    <div className="btn" disabled={!user?.result} onClick={handleLike}>
      <Likes />
    </div>
    <div className="card border-radius shadow">
      <img id="carImg" src={post.selectedFile} className="card-img card-img-top" alt="..."/>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div id="edit" name="edit">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
              console.log(post)
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )}

      <div className="card-body mx-2">
        <div id="carInfo" className="row card-text text-sm-center text-md-left">
          <p className="col-6">
            <strong>{post.brand}</strong><br />
            <span>{post.model}</span>
          </p>
          <p className="col-6">
            <strong>Host</strong><br />
            <span>{post.author}</span>
          </p>
        </div>
        <div id="carInfo" className="row card-text text-sm-center text-md-left">
          <p className="col-6">
            <span>VND/Day</span> <br />
            <strong>{post.price}</strong>
          </p>
          <p className="col-6"></p>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
          )}
        </div>
        <div className="row justify-content-center">
          <div onClick={openPost} id="btnGetOffer" className="btn border-radius mb-3 shadow font-weight-bold mx-5">Get Offer</div>
        </div>
      </div>


    </div>
    </>
    
  )
}

export default Post;
