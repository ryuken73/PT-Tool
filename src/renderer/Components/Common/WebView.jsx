import React from 'react';
import styled from 'styled-components';

const StyledWebview = styled.iframe`
  width: 100%;
  height: 100%;

`
const WebView = (props) => {
  const { src } = props;
  return <webview
  style={{width:'100%',height:'100%'}}
  src={src}
  />;
}

export default React.memo(WebView);
