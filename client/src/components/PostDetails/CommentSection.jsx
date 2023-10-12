import { useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { Typography, TextField, Button } from "@mui/material";

import { commentPost } from "../../actions/posts";

import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([1, 2, 3, 4]);

  const user = JSON.parse(localStorage.getItem("profile"));

  const { classes } = useStyles();

  const dispatch = useDispatch();

  const handleClick = () => {
    const finalComment = `${user.result.name}: ${comment}`;

    dispatch(commentPost(finalComment, post._id));

    // const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((cmnt, index) => (
            <Typography key={index} gutterBottom variant="subtitle1">
              Comment{index}
            </Typography>
          ))}
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a Comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment}
              color="primary"
              variant="contained"
              onClick={handleClick}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
