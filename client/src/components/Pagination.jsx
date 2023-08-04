import React, { useEffect } from "react";
import { Pagination, PaginationItem, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../actions/posts";

import useStyles from "./styles";
import { Link } from "react-router-dom";

const Paginate = ({page}) => {
  const {numberOfPages} = useSelector((state) => state.posts)
  const { classes } = useStyles();
  const dispatch = useDispatch()

  useEffect(() => {
    if(page) dispatch(getPosts(page))
  }, [page])

  return (
    <Stack spacing={2}>
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
      />
    </Stack>
  );
};

export default Paginate;
