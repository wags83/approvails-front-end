import React from 'react';

const CommentCard = (props) => {
    const {user, body} = props.comment
    

    return (
    <div>
        <h3>{user.username}: {body}</h3>
    </div>
    )

}

export default CommentCard