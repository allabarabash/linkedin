import styled from 'styled-components';
import React from "react";
import PostModal from "./PostModal";
import {useState, useEffect} from "react";
import {getPostsAPI} from "../actions";
import {connect} from 'react-redux';
import userPhoto from "../assets/images/user.svg";
import ellipsis from "../assets/images/ellipsis.svg";
import contentPhoto from "../assets/images/konyaalti.jpg";
import likeIcon from "../assets/images/like-icon.svg";
import commentIcon from "../assets/images/comment-icon.svg";
import shareIcon from "../assets/images/share-icon.svg";
import sendIcon from "../assets/images/send-icon.svg";
import spinLoader from "../assets/images/spin-loader.svg";
import ReactPlayer from "react-player";

const Main = (props) => {
    //by default is the modal closed
    const [showModal, setShowModal] = useState("close");

    useEffect(() => {
        props.getPosts()
    }, []);


    const handleClick = (e) => {
        e.preventDefault();
        if (e.target !== e.currentTarget) {
            return;
        }

        switch (showModal) {
            case "open":
                setShowModal("close");
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }

        /*console.log(store.getState());*/


    }
    console.log(props.posts.map((post, key) => {
        console.log("Image: ", post.actor.image);
    }));
    return (

        <>

            <Container>
                <ShareBox>
                    {}
                    <div>
                        {props.user.photoURL ? (
                            <img src={props.user.photoURL} alt=""/>
                        ) : (
                            <img src={userPhoto} alt=""/>
                        )}
                        <button onClick={handleClick}
                                disabled={props.loading}>Start a post
                        </button>
                    </div>

                    <div>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                 fill="currentColor" className="mercado-match" width="24" height="24"
                                 focusable="false">
                                <path
                                    d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"/>
                            </svg>
                            <span>Photo</span>
                        </button>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                 fill="currentColor" className="mercado-match" width="24" height="24"
                                 focusable="false">
                                <path
                                    d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"/>
                            </svg>
                            <span>Video</span>
                        </button>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                 fill="currentColor" className="mercado-match" width="24" height="24"
                                 focusable="false">
                                <path
                                    d="M3 3v15a3 3 0 003 3h12a3 3 0 003-3V3zm13 1.75A1.25 1.25 0 1114.75 6 1.25 1.25 0 0116 4.75zm-8 0A1.25 1.25 0 116.75 6 1.25 1.25 0 018 4.75zM19 18a1 1 0 01-1 1H6a1 1 0 01-1-1V9h14zm-5.9-3a1 1 0 00-1-1H12a3.12 3.12 0 00-1 .2l-1-.2v-3h3.9v1H11v1.15a3.7 3.7 0 011.05-.15 1.89 1.89 0 012 1.78V15a1.92 1.92 0 01-1.84 2H12a1.88 1.88 0 01-2-1.75 1 1 0 010-.25h1a.89.89 0 001 1h.1a.94.94 0 001-.88z"/>
                            </svg>
                            <span>Event</span>
                        </button>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24"
                                 fill="currentColor" className="mercado-match" width="24" height="24"
                                 focusable="false">
                                <path
                                    d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"/>
                            </svg>
                            <span>Article</span>
                        </button>
                    </div>
                </ShareBox>

                <PostModal showModal={showModal} handleClick={handleClick}/>

                {
                    props.posts.length === 0 ? (
                        <p>There are no posts</p>
                    ) : (
                        <Content>
                            { props.loading && <img src={spinLoader}/> }

                            { props.posts.length > 0 &&
                            props.posts.map((post, key) => (

                                <Article key={key}>
                                    <SharedActor>
                                        <a>
                                            <img src={post.actor.image} alt=""/>
                                            <div>
                                                <span>{post.actor.title}</span>
                                                <span>{post.actor.description}</span>
                                                <span>{post.actor.date.toDate().toLocaleDateString() } {post.actor.date.toDate().toLocaleTimeString()}</span>
                                            </div>
                                        </a>

                                    </SharedActor>
                                    <Description>{post.description}</Description>
                                    <SharedImg>
                                        <a>
                                            {
                                                post.sharedImg && (
                                                    <img src={post.sharedImg} alt=""/>
                                                )
                                            }

                                            {
                                                post.video && (
                                                    <ReactPlayer width={'100%'} url={post.video} />
                                                )
                                            }


                                        </a>
                                    </SharedImg>

                                    <SocialCounts>
                                        <li>
                                            <button>
                                                <img src="https://static-exp1.licdn.com/sc/h/d310t2g24pvdy4pt1jkedo4yb"
                                                     alt=""/>

                                                <img src="https://static-exp1.licdn.com/sc/h/5thsbmikm6a8uov24ygwd914f"
                                                     alt=""/>

                                                <span>75</span>
                                            </button>
                                        </li>
                                        <li>
                                            <a>{post.comments}</a>
                                        </li>
                                    </SocialCounts>
                                    <SocialActions>
                                        <button>
                                            <img src={likeIcon} alt=""/>
                                            <span>Like</span>
                                        </button>

                                        <button>
                                            <img src={commentIcon} alt=""/>
                                            <span>Comment</span>
                                        </button>

                                        <button>
                                            <img src={shareIcon} alt=""/>
                                            <span>Share</span>
                                        </button>

                                        <button>
                                            <img src={sendIcon} alt=""/>
                                            <span>Send</span>
                                        </button>
                                    </SocialActions>
                                </Article>
                            ))}
                        </Content>
                    )}

            </Container>

        </>
    )
};

const Container = styled.div`
    grid-area: main;
`;

const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
    border: none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 1px rgb(0 0 0 / 20%);
    
`;

const ShareBox = styled(CommonCard)`
    display: flex;
    flex-direction: column;
    color: #958b7b; 
    margin: 0 0 8px;
    background: white;
    
    div {
        button {
            outline: none;
            color: rgba(0, 0, 0, 0.6);
            font-size: 14px;
            line-height: 1.5;
            min-height: 48px;
            background: transparent;
            border: none;
            display: flex;
            align-items: center; //vertical alignment!!!
            font-weight: 600;
            
        }
        
        &:first-child {
            display: flex;
            align-items: center;
            padding: 8px 16px 0 16px;
            
            img {
                width: 48px;
                border-radius: 50%;
                margin-right: 8px;
            }
            
            button {
                margin: 4px 0;
                flex-grow: 1;
                border-radius: 35px;
                padding-left: 16px;
                border: 1px solid rgba(0, 0, 0, 0.15);
                background-color: white;
                text-align: left;
            }
        }
        
        &:nth-child(2) {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            padding-bottom: 4px;
            
            button {
                svg {
                    margin: 0 4px 0 -2px;
                }
                
                span {
                    color: #70b5f9;
                }
                
                &:first-child {
                    svg > path {
                        fill: #70b5f9;
                    }
                }
                
                &:nth-child(2) {
                    svg > path {
                        fill: #7fc15e;
                    }
                }
                
                &:nth-child(3) {
                    svg > path {
                        fill: #e7a33e;
                    }
                }
                
                &:nth-child(4) {
                    svg > path {
                        fill: #fc9295;
                    }
                }
            }
            
        }
    }
`;

const Article = styled(CommonCard)`
    padding: 0;
    margin: 0 0 8px;
    overflow: visible;
`;

const SharedActor = styled.div`
   flex-wrap: nowrap;
   padding: 12px 16px 0;
   margin-bottom: 8px;
   align-items: center;
   display: flex;
   
   a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;
        img {
            width: 48px;
            height: 48px;
        }
        
        & > div {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            flex-basis: 0;
            margin-left: 8px;
            overflow: hidden;
            
            span {
                text-align: left;
                
                 &:first-child {
                    font-size: 14px;
                    font-weight: 700;
                    color: rgba(0, 0, 0 1);
                 }
                 
                 &:nth-child(n+1) {
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.6);
                 }
                
            }
        }
   }
   
   button {
    position: absolute;
    right: 12px;
    top: 0;
    background: transparent;
    border: none;
    outline: none;
   }
     
`;

const Description = styled.div`
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    width: 100%;
    height: 100%;
  }

`;

const SocialCounts = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  
  li {
    margin-right: 5px;
    font-size: 12px;
      button {
        display: flex;
        background-color: white;
        border: none;
        
      }
  }
  

`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    background-color: white;
    border: none;
    
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;


const Content = styled.div`
  text-align: center;
  
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
    return {
        loading: state.postState.loading,
        user: state.userState.user,
        posts: state.postState.posts
    }
};

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => dispatch(getPostsAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);