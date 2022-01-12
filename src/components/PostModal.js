import { useState } from 'react';
import styled from "styled-components";
import React from "react";
import closeIcon from '../assets/images/close-icon.svg';
import userPhoto from '../assets/images/user.svg';
import sharePhoto from '../assets/images/share-photo.svg';
import shareVideo from '../assets/images/share-video.svg';
import shareDocument from '../assets/images/share-document.svg';
import shareComment from '../assets/images/share-comment.svg';

const PostModal = (props) => {

    return (
        <Container>
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button>
                        <img src={closeIcon} alt=""/>
                    </button>
                </Header>
                <SharedContent>
                    <UserInfo>
                        <img src={userPhoto} alt=""/>
                        <span>Name</span>
                    </UserInfo>
                </SharedContent>
                <SharedCreation>
                    <AttachAssets>
                        <AssetButton>
                            <img src={sharePhoto} alt=""/>
                        </AssetButton>
                        <AssetButton>
                            <img src={shareVideo} alt=""/>
                        </AssetButton>
                    </AttachAssets>

                    <ShareComment>
                        <AssetButton>
                            <img src={shareComment} alt=""/>
                            Alle
                        </AssetButton>
                    </ShareComment>

                    <PostButton>
                        Post
                    </PostButton>

                </SharedCreation>
            </Content>
        </Container>
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
      
      img {
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
  background: #0a66c2;
  color: white;
  
  &:hover {
    background: #004182;
  }
`;

export default PostModal;