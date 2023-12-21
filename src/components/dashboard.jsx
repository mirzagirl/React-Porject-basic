import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsRequest,
  fetchUsersRequest,
} from "../redux-saga/redux/usersPost";

import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userPostsCount, setUserPostsCount] = useState({});

  const { posts, users, loading } = useSelector((state) => state.post);

  useEffect(() => {
    // Function to count posts for each user
    if (posts && posts.length > 0) {
      const countObject = {};

      posts.forEach((post) => {
        const userId = post.userId;
        countObject[userId] = (countObject[userId] || 0) + 1;
      });

      // Set userPostsCount to the countObject directly
      setUserPostsCount(countObject);
    }
  }, [posts]);

  useEffect(() => {
    dispatch(fetchPostsRequest());
    dispatch(fetchUsersRequest());
  }, []);

  const goToPosts = (id) => {
    navigate(`/${id}`);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="grid-container">
          <h5>Directory</h5>
          {users &&
            users.map((user, index) => (
              <div
                className="grid-item"
                key={index}
                onClick={() => goToPosts(user.id)}
              >
                <div className="card">
                  <div className="user-info">
                    <div className="user-name">Name: {user.name}</div>
                    <div className="post-count">{`Posts: ${
                      userPostsCount[user.id]
                    }`}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};
