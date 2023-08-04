import { useState, useEffect } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
  
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import Pagination from "../Pagination";
import ChipInput from "material-ui-chip-input"

import useStyles from "./styles";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes  = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);


  const searchPost = () => {
    if(search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",")}));
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      navigate("/")
    }
  }

  const handleKeyPress = (e) => {
    if(e.keyCode === 13) {
      searchPost();
    }
  }

  const handleAdd = (tag) => setTags([...tags, tag])

  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag != tagToDelete));

  return (
    <Grow in>
      <Container
        maxWidth="lg"
        // sx={{ paddingBottom: { xs: "4rem", sm: "2rem" } }}
      >
        <Grid
          sx={{flexDirection: {xs: "column-reverse", md: "row"}}}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          
        >
          <Grid items xs={12} sm={6} md={8.5}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid items xs={12} sm={6} md={3.3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyDown={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput 
                style={{margin: "10px 0"}}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"


              />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
