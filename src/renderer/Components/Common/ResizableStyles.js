import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  bottom: ${(props) => `${props.index * 80 + 10}px`};
  right: 50px;
  touch-action: none;
  user-select: none;
  z-index: 1000;
`;
export const FullBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  background: ${(props) => props.background};
  color: ${(props) => props.font};
  border: ${(props) => `3px solid ${props.border}`};
  border-radius: 20px;
  padding: 10px;
  font-weight: bold;
  box-sizing: border-box;
`;
export const Controls = styled.div`
  position: fixed;
  display: ${(props) => (props.hide ? 'none' : 'block')};
  width: 50%;
  left: 25%;
  bottom: 5%;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;
export const SaveConfirm = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
  padding: 10px;
  z-index: 1000;
`;
export const Button = styled.div`
  /* margin-bottom: 5%; */
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
  font-size: 30px;
  color: yellow;
  backdrop-filter: blur(100px);
  background: grey;
  opacity: 0.8;
`;
export const SmallText = styled.div`
  backdrop-filter: blur(10px);
  font-size: 1rem;
  /* background: teal; */
  opacity: 0.8;
  color: ${(props) => (props.active ? 'black' : 'lightgrey')};
  margin-right: 20px;
  border-radius: 10px;
`;
export const StyleContainer = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  align-items: center;
  justify-content: ${(props) =>
    props.flexStart ? 'flex-start' : 'space-evenly'};
  width: 100%;
`;
export const ColorBox = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border: 4px white solid;
  box-sizing: border-box;
  background: ${(props) => props.background};
`;
export const ColorPickerContainer = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'flex')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(50%, 0);
  z-index: 1000;
`;
export const EasingContainer = styled.div`
  display: ${(props) => (props.hide ? 'none' : 'block')};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(250%, 90%);
  z-index: 1000;
  color: black;
  background: white;
  text-align: left;
  font-size: 1rem;
  padding: 10px;
  border-radius: 10px;
`;
