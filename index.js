import { Button } from '@material-ui/core/';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { updatePost, deletePost } from "../../../redux/actions"
import './styles.css'

const Post = ({post, setCurrentId}) => {
    const dispatch = useDispatch()

    const onLikeBtnClick = useCallback(() => {
        dispatch(updatePost.updatePostRequest({...post, likeCount: post.likeCount + 1}))
    }, [dispatch, post])

    const deleteBtn = useCallback(() => {
        dispatch(deletePost.deletePostRequest({_id: post._id}))
    }, [post, dispatch])

    return ( 
        <div className="card bg-light border-radius shadow"> 
            <img id="carImg" src={post.attachment} className="card-img-top" alt="CarPic" />
            <div id="btn-like" onClick={onLikeBtnClick} className="btn btn-primary mx-2 my-1"><span>{`${post.likeCount} likes`}</span></div>
            <div style={{ 
                position: 'absolute',
                top: '20px',
                right: '20px',
                color: 'white',}}>
                <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>
            </div>
            <div className="card-body mx-2">
                <div id="carInfo" className="row card-text text-sm-center text-md-left">
                    <p className="col-6">
                        <span>{post.brand}</span><br />
                        <span>{post.model}</span>
                    </p>
                    <p className="col-6">
                        <span>Host</span><br />
                        <span>{post.author}</span>
                    </p>
                </div>
                <div id="carInfo" className="row card-text text-sm-center text-md-left">
                    <p className="col-6">
                        <span>Price</span><br />
                        <strong>{post.price}</strong>
                    </p>
                    <p className="col-6"></p>
                    
                </div>
            <div className="row mx-1 justify-content-center my-2">
                <a id="btnGetOffer" className="btn shadow font-weight-bold">Get Offer</a>
                <button onClick={deleteBtn}>Delete Offer</button>
            </div>       
            </div>
        </div>
    )
}
 
export default Post