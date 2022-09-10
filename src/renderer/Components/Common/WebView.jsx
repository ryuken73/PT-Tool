import React from 'react';
import styled from 'styled-components';
import ReloadButton from './ReloadButton';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
const WebView = (props) => {
  const { src } = props;
  const webviewRef = React.useRef('null');
  const reload = React.useCallback(() => {
    webviewRef.current.reload();
  }, []);
  return (
    <Container>
      <webview
        ref={webviewRef}
        style={{width:'100%',height:'100%'}}
        src={src}
      />
      <ReloadButton reload={reload}></ReloadButton>
    </Container>
  )
}

export default React.memo(WebView);
