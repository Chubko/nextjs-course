import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      console.log(3)
      fetch('api/comments/'+eventId)
      .then(response => {
        console.log(response)
        return response.json()
      })
      .then(data => {
        console.log('data', data)
        setComments(data.comments);
      })
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    console.log(2)
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    console.log(1)
    fetch('api/comments' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json()
    .then(data => console.log(data)))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
}

export default Comments;