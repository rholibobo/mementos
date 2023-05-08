
import { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@mui/material";

import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";

// import useStyles from "./styles";

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  // const { classes } = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]); // eslint-disable-next-line

  return (
    <Grow in>
      <Container
        sx={{ paddingBottom: { xs: "4rem", sm: "2rem" } }}
      >
        <Grid
          sx={{
            flexDirection: { xs: "column-reverse", md: "row" },
            justifyContent: { xs: "space-between", sm: "space-between" },
            gap: { xs: "2rem", sm: "0" },
          }}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid items xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid items xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
