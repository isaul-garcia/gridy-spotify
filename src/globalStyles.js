import styled, { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: sans-serif; 
        overflow: hidden;
    }    

    body {
        background-color: #000;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        -webkit-overflow-scrolling: auto;
        overflow: hidden;

        &::-webkit-scrollbar {
        display: none;
        }
    }

    button:focus {
    outline: none;
    }

    img {
      position: relative;
      width: 100%;
      display: block;
    }

    p {
      display: inline-block;
      line-height: 2.65em;
      margin-left: 1em;
      color: #555;
    }

    .ps {
      margin-left: 0em;
    }

    .App {
      width: 100%;
      height: 100vh;
      text-align: center;
      position: absolute;
      overflow: hidden;
    }

    .for-grid {
      height: 9.07vw;
      width: 9.07vw;
      object-fit: cover;
      transition: 0.8s;
      opacity: 1;
      cursor: pointer;
    }

    .for-grid:hover{
      padding: 0.5em;
      opacity: 0.25;
    }

    .container-for-grid {
      display: inline-block;
      vertical-align: top;
    }

    .containerAnimate {      
      -webkit-animation-name: glide;
      -webkit-animation-duration: 30000ms;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-timing-function: linear;
      -moz-animation-name: glide;
      -moz-animation-duration: 30000ms;
      -moz-animation-iteration-count: infinite;
      -moz-animation-timing-function: linear;
      -ms-animation-name: glide;
      -ms-animation-duration: 30000ms;
      -ms-animation-iteration-count: infinite;
      -ms-animation-timing-function: linear;
      animation-name: glide;
      animation-duration: 30000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;  
    }

    .Results {
      width: 100%;
      height: 100%;
      text-align: center;
      border: 1px solid #bbb;
      border-radius: 0.25em;
      padding: 0.75em;
      margin: 4em auto;
      position: relative;
    }

    .img-container {
      width: 100%;    
    }

    .container-logo { 
      position: absolute;
      display: block;
      background-color: #ff0;
      z-index: 3;
      bottom: 0;
      width: 14.5em;
    }

    .for-logo {
      width: 100%;
    }

    @media screen and (max-width: 991px) {
      .for-grid {
        height: 20vw;
        width: 20vw;
      }
    }

    @keyframes glide {
      0%   {margin-top: 0vw;}
      25%  {margin-top: -12.5vw;}
      50%  {margin-top: -25vw;}
      75%  {margin-top: -12.5vw;}
      100% {margin-top: 0vw;}
    }
`

export const CustomButtonRoot = styled('button')`
  background-color: ${({ spotify }) => (spotify ? '#1ed860' : '#002eff')};
  background-color: ${({ other }) => (other ? '#e600e6' : '')};
  min-width: 6em;
  padding: 15px 20px;
  color: #fff;
  font-weight: 600;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1em;
  cursor: pointer;
  border: none;
  display: block;
  position: absolute;
  z-index: 2;
  bottom: 0;
  transition: 0.4s;
  opacity: ${({ showGrid }) => (showGrid ? '0' : '1')};
  margin-left: ${({ spotify }) => (spotify ? '16.5em' : '22.45em')};

  &:hover {
    background-color: ${({ spotify }) => (spotify ? '#1ca14b' : '#031cac')} ;
    background-color: ${({ other }) => (other ? '#b300b3' : '')};
    opacity: ${({ showGrid }) => (showGrid ? '1' : '1')};
  }

  &.active {
    background-color: #004386;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media screen and (max-width: 991px) {
    min-width: 5.35em;
    opacity: ${({ showGrid }) => (showGrid ? '0.4' : '1')};
  }
`

export const ContainerLogo = styled.div`
  position: absolute;
  display: block;
  background-color: #ff0;
  z-index: 3;
  bottom: 0;
  width: 14.5em;
  opacity: ${({ toggle }) => (toggle ? '0' : '1')};
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    opacity: ${({ toggle }) => (toggle ? '0.4' : '0.9')};
  }
`

export const InstructionsContainer = styled.div`
  opacity: ${({ show }) => (show ? '0' : '1')};
  text-align: left;
  position: absolute;
  display: block;
  width: 40%;
  margin-left: 35%;
  height: 20em;
  margin-top: 10%;
`

export const ErrorMessage = styled.p`
  display: inline-block;
  line-height: 2.65em;
  margin-left: 1em;
  color: #dc0a29;
  margin-left: 0em;
`

export const Box = styled.div`
  display: inline-block;
  background-color: ${({ checked }) => (checked ? '#1ed860' : '#555')};
  color: #000;
  font-size: 14px;
  font-weight: 700;
  line-height: 1em;
  padding: 1em 1.1em;
`

export const SpacingSmall = styled.div`
  height: 0.25em;
`

export const SpacingMedium = styled.div`
  height: 1.5em;
`

export const SpacingLarge = styled.div`
  height: 3em;
`
  ;

export default GlobalStyle