import {useState} from 'react';
import styled from "styled-components";
import React from "react";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { postArticleAPI } from '../actions';
import { serverTimestamp } from "firebase/firestore";
import closeIcon from '../assets/images/close-icon.svg';
import userPhoto from '../assets/images/user.svg';
import sharePhoto from '../assets/images/share-photo.svg';
import shareVideo from '../assets/images/share-video.svg';
import shareComment from '../assets/images/share-comment.svg';

const PostModal = (props) => {

    const [editorText, setEditorText] = useState("");
    const [shareImage, setShareImage] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [assetArea, setAssetArea] = useState("");

    const handleChange = (e) => {
        const image = e.target.files[0];

        if (!image) {
            alert(`Not an image, the file is a ${typeof image}`);
            return;
        }

        setShareImage(image);
    }

    const switchAssetArea = (area) => {
        setShareImage("");
        setVideoLink("");
        setAssetArea("");
        setAssetArea(area);
    }

    const postArticle = (e) => {
        e.preventDefault();

        if (e.target !== e.currentTarget) {
            return;
        }

        const payload = {
            image: shareImage,
            video: videoLink,
            user: props.user,
            description: editorText,
            timestamp: serverTimestamp()
        };

        props.postArticle(payload);
        reset(e);

    }

    const reset = (e) => {
        setEditorText("");
        setShareImage("");
        setVideoLink("");
        props.handleClick(e);
    }
    return (
        <>
            {props.showModal === 'open' &&

            <Container>
                <Content>
                    <Header>
                        <h2>Create a post</h2>
                        <button onClick={(event) => reset(event)}>
                            <img src={closeIcon} alt=""/>
                        </button>
                    </Header>
                    <SharedContent>
                        <UserInfo>
                            {props.user.photoURL ?  (
                                <img src={props.user.photoURL} alt=""/>
                            ) : (
                                <img src={ userPhoto } alt=""/>
                            )}

                            {props.user.displayName ?  (
                                <span>{props.user.displayName}</span>
                            ) : (
                                <span>Name</span>
                            )}

                        </UserInfo>
                        <Editor>
                                <textarea
                                    value={editorText}
                                    onChange={(e) => {
                                        /* console.log(e.target.value);*/
                                        setEditorText(e.target.value)
                                    }}
                                    placeholder="Say something"
                                    autoFocus={true}
                                >

                                </textarea>

                            {assetArea === 'image' ? (
                                <UploadImage>

                                    <input
                                        type="file"
                                        accept='image/gif, image/jpeg, image/png'
                                        name='image'
                                        id='file'
                                        style={{display: "none"}}
                                        onChange={handleChange}
                                    />

                                    <p>
                                        <label htmlFor="file">Select an image to share</label>
                                    </p>
                                    {shareImage && <img src={URL.createObjectURL(shareImage)}/>}
                                </UploadImage>
                                ) :
                                assetArea === 'media' && (
                                <>
                                    <input type="text"
                                           placeholder="Please input a video link"
                                           value={videoLink}
                                           onChange={(e) => {
                                               setVideoLink(e.target.value);
                                           }}
                                    />
                                    {videoLink && <ReactPlayer width={'100%'} url={videoLink}/>}
                                </>
                                )
                            }
                        </Editor>
                    </SharedContent>
                    <SharedCreation>
                        <AttachAssets>
                            <AssetButton onClick={()=>switchAssetArea('image')}>
                                <img src={sharePhoto} alt=""/>
                            </AssetButton>
                            <AssetButton onClick={()=>switchAssetArea('media')}>
                                <img src={shareVideo} alt=""/>
                            </AssetButton>
                        </AttachAssets>

                        <ShareComment>
                            <AssetButton>
                                <img src={shareComment} alt=""/>
                                Alle
                            </AssetButton>
                        </ShareComment>

                        <PostButton disabled={!editorText}
                                    onClick={(event) => postArticle(event)}>
                            Post
                        </PostButton>

                    </SharedCreation>
                </Content>
            </Container>
            }
        </>
    )
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8 );
  animation: fadeIn 1s;
  
  

`;

const Content = styled.div`
  width: 100%;
  max-width: 592px;
  background-color: white;
  max-height: 90%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  
`;

const Header = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 16px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  
  
  button {
      height: 40px;
      width: 40px;
      min-width: auto;
      color: rgba(0, 0, 0, 0.15);
      background: none;
      border: none;
      
      img, svg {
        pointer-events: none;
      }

  }
`;

const SharedContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
  
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  img, svg {
    width: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    font-size: 16px;
    line-height: 1.5;
    margin-left: 5px;
  }
`;

const SharedCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 12px 16px;
`;


const AssetButton = styled.button`
  display: flex;
  align-items: center;
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.5);
`;

const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;

const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  
  ${AssetButton} {
    svg {
      margin-right: 5px;
    }
  }
`;

const PostButton = styled.button`
  min-width: 50px;
  border-radius: 20px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${props => (props.disabled ? 'rgba(0, 0, 0, 0.8)' : '#0a66c2')};
  color: ${props => (props.disabled ? 'grey' : '#fff')};
  
  &:hover {
    background: ${props => (props.disabled ? 'rgba(0, 0, 0, 0.08)' : '#004182')};
  }
`;

const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    
  }
  input {
    width: 100%;
    height: 35px;
    font-size: 16px;
    margin-bottom: 20px;
  
  }
`;

const UploadImage = styled.div`
  text-align: center;
  img {
    width: 100%;
  }
  
`;

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    }
}
const mapDispatchToProps = (dispatch) => ({
    postArticle: (payload) => dispatch(postArticleAPI(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);