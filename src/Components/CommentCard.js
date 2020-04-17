import React from 'react';

const CommentCard = (props) => {
    const {user, body} = props.comment
    

    return (
        <div class="comment">
            <p class="comment_title"> {user.username} </p>
            <p class="comment_paragraph"> {body}</p>
    </div>
    )

}

export default CommentCard