import React, { useEffect } from 'react';
import { Paper, CircularProgress } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import useStyles from './styles';
import './styles.css'

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none' }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return(
    <div id="car-detail-box" className="border-radius container my-5 border bg-light shadow">
      <div className="row">
        <div id="car-detail" className="card bg-light w-100 border-0">
          <div className="card-body">
      
            <h2 id="car-brand" className="card-title my-3 text-center">{post.brand}</h2>
            <h4 id="car-model" className="text-center">{post.model}</h4>
      
            <div id="carouselExampleFade" className="carousel slide carousel-fade mx-5" data-ride="carousel">
              <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img id="carousel-img" src={post.selectedFile} className="d-block border-radius shadow" alt="..."/>
                  </div>
                  <div className="carousel-item">
                    <img id="carousel-img" src={post.selectedFile} className="d-block border-radius shadow" alt="..."/>
                  </div>
                  <div className="carousel-item">
                    <img id="carousel-img" src={post.selectedFile} className="d-block border-radius shadow" alt="..."/>
                  </div>
                </div>
                  <a className="carousel-control-prev " href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                  </a>
                  <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
            </div>
                
            <h4 className="mx-sm-5 my-3"> Car Overview </h4>
            <div className="container px-sm-5 mx-sm-2">
              <div  id="car-overview" className="row">
                <div className="col-sm-5 mx-sm-2 py-sm-4 px-sm-4 border-radius card-text border">
                  <p><strong>Body Type: </strong><span>{post.body}</span></p> 
                  <p><strong>Engine: </strong><span>{post.engine}</span></p> 
                  <p><strong>Seats: </strong><span>{post.seats}</span></p> 
                  <p><strong>Fuel Consumption (L/100km): </strong><span>{post.fuel_consumption}</span></p> 
                  <p><strong>Fuel Type: </strong><span>{post.title}</span></p>
                  <p><strong>Fuel Tank Capacity (L): </strong><span>{post.title}</span></p> 
                </div>
                    <br />
                <div className="col-sm-1"></div>
                    <br />
                <span className="mx-3"></span><div className="col-sm-5 mx-sm-2 py-sm-4 px-sm-4 border-radius card-text border">
                  <p><strong>Length (mm): </strong> <span>{post.title}</span></p>
                  <p><strong>Width (mm): </strong><span>{post.title}</span> </p>
                  <p><strong>Height (mm): </strong><span>{post.title}</span></p>
                  <p><strong>Wheelbase (mm): </strong><span>{post.title}</span></p>
                  <p><strong>Gears: </strong><span>{post.title}</span></p>
                  <p><strong>PRICE (VND/Day): </strong><span>{post.title}</span></p>
                </div>
              </div>
            </div>
      
            <div className="d-flex justify-content-center">
              <a href="#" id="btn-get-car" className="btn font-weight-bold px-4 py-2 my-5 border-radius shadow">Get Car Offer</a>
            </div>
          </div>
        </div>
      </div>
    
      <h4 className="mx-5"> Reviews </h4>
      <div className="row">
          <CommentSection post={post} />
      </div>
    </div> 
  )
}
export default Post
