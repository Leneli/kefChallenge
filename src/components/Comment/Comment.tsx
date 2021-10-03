import React, { FC } from 'react';
import { ReactComponent as LikeSvg } from 'src/assets/like.svg';
import './index.css';

type TCommentComponent =
  Pick<TComment, 'created' | 'likes' | 'text'> &
  Omit<TAuthor, 'id'> &
  {step: number};

const Comment: FC<TCommentComponent> = ({ children, name: authorName, avatar, created, likes, text, step }) => (
  <div
    className="comment"
    style={{
      marginLeft: `${step * 10}px`,
      marginBottom: step === 0 ? '15px' : 0,
      borderBottomWidth: step === 0 ? '1px' : 0
    }}
  >
    <div className="comment__info">
      <div className="comment__avatar">
        {avatar ? (
          <img src={avatar} alt={authorName} className="avatar" />
        ) : (
          <div className="avatar_nil"></div>
        )}
      </div>

      <div className="comment__personsData">
        <div className="comment__author">
          <span className="comment__authorName">{authorName}</span>
          <span className="comment__date">{created}</span>
        </div>

        <div className="comment__likes">
          {/* TODO: clickable */}
          <LikeSvg />
          <span className="comment__likesCount">{likes}</span>
        </div>
      </div>
    </div>

    <div className="comment__content">{text}</div>

    {children}
  </div>
);

export default Comment;
