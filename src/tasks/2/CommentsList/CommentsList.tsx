import React, { FC, useState } from 'react';
import { Comment } from 'src/components/Comment';

interface ICommentsList {
    authors: TAuthor[];
    comments: TComment[];
}

const CommentsList: FC<ICommentsList> = ({ comments, authors }) => {
    const [filteredComments] = useState(comments.filter(c => !c.parent));

    const renderComment = (comment: TComment, step = 0) => {
        const child = comments.find(child => child.parent === comment.id);
        const author = authors.find(a => a.id === comment.author);
        const props = {
            name: author?.name || 'NoName',
            avatar: author?.avatar,
            created: comment.created,
            likes: comment.likes,
            text: comment.text
        };

        return (
            <Comment key={comment.id} {...props} step={step}>
                {!!child && renderComment(child, ++step)}
            </Comment>
        );
    };

    return <div style={{ padding: '30px' }}>
        {filteredComments.map(c => renderComment(c))}
    </div>;
};

export default CommentsList;
