import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { useHistory } from 'react-router-dom'
import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles'

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ brand: '',
    model: '',
    engine: '',
    body: '',
    seats: '',
    fuel_consumption: '',
    fuel_type: '',
    fuel_tank: '',
    length: '',
    width: '',
    height: '',
    wheelbase: '',
    gears: '',
    author: '',
    price: '',
    selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({ brand: '',
    model: '',
    engine: '',
    body: '',
    seats: '',
    fuel_consumption: '',
    fuel_type: '',
    fuel_tank: '',
    length: '',
    width: '',
    height: '',
    wheelbase: '',
    gears: '',
    author: '',
    price: '',
    selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Add New Car Offer'}</Typography>
      <TextField 
      name="brand" 
      variant="outlined" 
      label="Car Brand" 
      fullWidth value={postData.brand} 
      onChange={(e) => setPostData({ ...postData, brand: e.target.value })} 
      />
      
      <TextField 
      name="model" 
      variant="outlined" 
      label="Car Model" 
      fullWidth value={postData.model} 
      onChange={(e) => setPostData({ ...postData, model: e.target.value })} 
      />
      
      <TextField 
      name="body" 
      variant="outlined" 
      label="Car Body" 
      fullWidth value={postData.body} 
      onChange={(e) => setPostData({ ...postData, body: e.target.value })} 
      />
      
      <TextField 
      name="engine" 
      variant="outlined" 
      label="Car Engine" 
      fullWidth value={postData.engine} 
      onChange={(e) => setPostData({ ...postData, engine: e.target.value })} 
      />
      
      <TextField 
      name="seats" 
      variant="outlined" 
      label="Seats" 
      fullWidth value={postData.seats} 
      onChange={(e) => setPostData({ ...postData, seats: e.target.value })} 
      />
      
      <TextField 
      name="fuel_consumption" 
      variant="outlined" 
      label="Fuel Consumption (L/KM)" 
      fullWidth value={postData.fuel_consumption} 
      onChange={(e) => setPostData({ ...postData, fuel_consumption: e.target.value })} 
      />
      
      <TextField 
      name="fuel_tank" 
      variant="outlined" 
      label="Fuel Tank (L)" 
      fullWidth value={postData.fuel_tank} 
      onChange={(e) => setPostData({ ...postData, fuel_tank: e.target.value })} 
      />

      <TextField 
      name="fuel_type" 
      variant="outlined" 
      label="Fuel Type" 
      fullWidth value={postData.fuel_type} 
      onChange={(e) => setPostData({ ...postData, fuel_type: e.target.value })} 
      />
      
      <TextField 
      name="length" 
      variant="outlined" 
      label="Length (mm)" 
      fullWidth value={postData.length} 
      onChange={(e) => setPostData({ ...postData, length: e.target.value })} 
      />
      
      <TextField 
      name="width" 
      variant="outlined" 
      label="Width (mm)" 
      fullWidth value={postData.width} 
      onChange={(e) => setPostData({ ...postData, width: e.target.value })} 
      />

      <TextField 
      name="height" 
      variant="outlined" 
      label="Height (mm)" 
      fullWidth value={postData.height} 
      onChange={(e) => setPostData({ ...postData, height: e.target.value })} 
      />

      <TextField 
      name="wheelbase" 
      variant="outlined" 
      label="Wheelbase (mm)" 
      fullWidth value={postData.wheelbase} 
      onChange={(e) => setPostData({ ...postData, wheelbase: e.target.value })} 
      />

      <TextField 
      name="gears" 
      variant="outlined" 
      label="Gears" 
      fullWidth value={postData.gears} 
      onChange={(e) => setPostData({ ...postData, gears: e.target.value })} 
      />

      <TextField 
      name="author" 
      variant="outlined" 
      label="Your Name" 
      fullWidth value={postData.author} 
      onChange={(e) => setPostData({ ...postData, author: e.target.value })} 
      />

      <TextField 
      name="price" 
      variant="outlined" 
      label="Price Per Day (VND)" 
      fullWidth value={postData.price} 
      onChange={(e) => setPostData({ ...postData, price: e.target.value })} 
      />
      
      <div className={classes.fileInput}><FileBase type="file" onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
      <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
      <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
    </form>
  </Paper>
  )
}

export default Form;
