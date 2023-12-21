import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchUserPostsRequest,
  fetchUsersDetailsRequest,
} from "../redux-saga/redux/usersPost";
import Counter from "./country";

const UserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, usersPost, userData } = useSelector((state) => state.post);
  const { userId } = useParams();
  const [selectedPost, setSelectedPost] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPostsRequest(userId));
      dispatch(fetchUsersDetailsRequest(userId));
    }
  }, [userId]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const openModal = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    modalRef.current?.addEventListener("keydown", handleEscapeKey);

    return () => {
      modalRef.current?.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <>
      {loading && <h4>Loading...</h4>}
      {userData && !loading && (
        <div>
          <div className="container-post">
            <div
              className="box"
              onClick={() => {
                navigate("/");
              }}
            >
              Back
            </div>

            <Counter />
            <div className="rectangle">
              <div className="left-side">
                <div>Name: {capitalizeFirstLetter(userData.name)}</div>
                <div>Username: {capitalizeFirstLetter(userData.username)}</div>
                <div>
                  Catchphrase:{" "}
                  {capitalizeFirstLetter(userData.company.catchPhrase)}
                </div>
              </div>
              <div className="right-side">
                <div>
                  Address: {capitalizeFirstLetter(userData.address.street)},
                  {userData.address.city}
                </div>
                <div>Email: {capitalizeFirstLetter(userData.email)}</div>
                <div>Phone: {capitalizeFirstLetter(userData.phone)}</div>
              </div>
            </div>
          </div>
          <div className="grid">
            {usersPost &&
              usersPost.map((post, index) => (
                <div
                  key={index}
                  className="grid-item-post"
                  onClick={() => openModal(post)}
                >
                  <h3>{capitalizeFirstLetter(post.title)}</h3>
                  <p>{capitalizeFirstLetter(post.body)}</p>
                </div>
              ))}
          </div>
        </div>
      )}
      {selectedPost && (
        <div className="modal" ref={modalRef} onClick={closeModal}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{capitalizeFirstLetter(selectedPost.title)}</h2>
            <p>{capitalizeFirstLetter(selectedPost.body)}</p>
          </div>
        </div>
      )}
    </>
  );
};

export { UserDetails };
