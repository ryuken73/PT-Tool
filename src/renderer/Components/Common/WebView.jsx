import React from 'react';
import styled from 'styled-components';
import ReloadButton from './ReloadButton';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
`
const WebView = (props) => {
  const { src } = props.asset;
  const srcIsArray = Array.isArray(src);
  const srcArray = srcIsArray ? src : [src];
  const webviewRefs = srcArray.map(() => React.useRef(null));

  const reload = React.useCallback(() => {
    webviewRefs.forEach(ref => ref.current.reload());
  }, [webviewRefs]);

  return (
    <Container>
      {srcArray.map((src, index) => (
        <webview
          key={src}
          ref={webviewRefs[index]}
          style={{ width: '100%', height: '100%' }}
          src={src}
        />
      ))}
      <ReloadButton reload={reload} />
    </Container>
  )
}

export default React.memo(WebView);
