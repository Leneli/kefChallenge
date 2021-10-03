import React, { useState, useEffect } from 'react';
import getDataRequest from 'src/tasks/2/data/getDataRequest';
import Stopwatch from 'src/tasks/1/Stopwatch';
import CommentsList from 'src/tasks/2/CommentsList';

function App() {
    const [commentsArr, setComments] = useState<TComment[]>();
    const [authorsArr, setAuthors] = useState<TAuthor[]>();

    useEffect(() => {
        (async function () {
            const { comments, authors } = await getDataRequest();

            setComments(comments);
            setAuthors(authors);
        })();
    }, []);

    return (
        <div className='App'>
            <Stopwatch />
            <hr />
            {!commentsArr || !authorsArr ? (
                <div>Loading...</div>
            ) : <CommentsList authors={authorsArr} comments={commentsArr} />}
        </div>
    );
}

export default App;
