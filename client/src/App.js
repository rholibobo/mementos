import { useState,useEffect } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import {getPosts} from "./actions/posts";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./Images/memories.png";
import useStyles from "./styles"

function App() {
  const [currentId, setCurrentId] = useState(null)
  const {classes} = useStyles();
  const dispatch = useDispatch();

  useEffect(()=> {
      dispatch(getPosts());
  }, [dispatch]); 

  return (
    <Container maxidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">Mementos</Typography>
        <img className={classes.image} src={memories} alt="mementos" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems='stretch' spacing={2}>
            <Grid items xs={12} sm={7}>
              <Posts  setCurrentId={setCurrentId} />
            </Grid>
            <Grid items xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App;
