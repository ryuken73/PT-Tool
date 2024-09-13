import React from 'react';
import styled from 'styled-components';
import CSSToggleMenuWebView from '../Menus/CSSToggleMenuWebView';
import ReloadButton from './ReloadButton';
import EarthRefreshButton from './EarthRefreshButton';
import EarthMousePosition from './EarthMousePosition';
import EarthNavigationButtons from './EarthNavigationButtons';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
`
// const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Touch) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.174 Electron/16.1.0 Safari/537.36"
// const ua = "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1";
// const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"
// const ua = "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36";
// const ua = "Mozilla/5.0 (Linux; Android 11.0; Surface Duo) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36"
// const ua = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Mobile Safari/537.36";

const earthString = 'earth.nullschool.net';
const weatherStrig = 'weather.go.kr';
const googleEarthString = 'earth.google.com';

const earthCSS = [
  // 'div.earth-bar { position: absolute !important; margin-left: 85%; margin-top: 40%; }',
  'div.earth-bar { position: absolute !important; right: 250px; left: auto; bottom: 30px}',
  'div.stack { position: absolute !important; right: 250px; left: auto; bottom: 110px; }'
  // 'div.stack { position: absolute !important; margin-left: 69%; margin-bottom: 70px; }'
];
const weatherCSS = [
  '#nav > div.nav {position: relative; margin-left: auto; margin-right: 20px; margin-top: 100px; width:170px;}',
  '#nav > div.navSum {position: relative; margin-left: auto; margin-right: 20px; margin-top: 100px; width:170px; max-width: 170px;}',
];

const WebView = (props) => {
  // eslint-disable-next-line react/prop-types
  const {
    src,
    srcId,
    show,
    srcIndex,
    scale = 1,
    translateX = 0,
    translateY = 0,
    displayMode,
  } = props;
  const isFirstImage = srcIndex === 0;
  const webviewRef = React.useRef(null);

  React.useEffect(() => {
    if(src === undefined) return;
    const webview = webviewRef.current;
    if (src.includes(earthString)) {
      webview.addEventListener('dom-ready', () => {
        earthCSS.forEach((css) => webview.insertCSS(css));
        webview.setZoomFactor(0.67);
      });
    }
    if (src.includes(weatherStrig)) {
      webview.addEventListener('dom-ready', () => {
        weatherCSS.forEach((css) => webview.insertCSS(css));
      });
    }
    // webview.addEventListener('console-message', e => console.log('webview-messge:', e.message));
    // webview.addEventListener('did-start-navigation', e => console.log('webview-messge: did-start-navigation'));
    // webview.addEventListener('did-stop-navigation', e => console.log('webview-messge: did-stop-navigation'));
    // webview.addEventListener('did-navigate', e => console.log('webview-messge: did-navigate'));
    // webview.addEventListener('did-stop-loading', e => console.log('webview-messge: did-stop-loading'));
    // webview.addEventListener('load-commit', e => console.log('webview-messge: load-commit'));
    // webview.addEventListener('did-fail-load', e => console.log('webview-messge: did-fail-load'));
    // webview.addEventListener('did-frame-finish-load', e => console.log('webview-messge: did-frame-finish-load'));
    // webview.addEventListener('ipc-message', e => console.log('webview-messge: ipc-message'));
    // webview.addEventListener('close', e => console.log('webview-messge: close'));
    // webview.addEventListener('did-redirect-navigation', e => console.log('webview-messge: did-redirect-navigation'));
    // webview.addEventListener('mouseup', e => console.log('mouseup'));
    // webview.addEventListener('dom-ready', e => {
    //   webview.executeJavaScript(`console.log('dom-ready')`)
    //   webview.executeJavaScript(`
    //     const canvas=document.querySelector('canvas');
    //     canvas.addEventListener('mouseup', e => console.log('mouseup'))
    //   `)
    // });

    //   const canvas = document.querySelector('canvas');
    //   canvas.addEventListner('mouseup', console.log('mouse-up'));
    // `)
  }, [src, webviewRef]);

  const reload = React.useCallback(() => {
    webviewRef.current.reload();
  }, []);

  const repaintWebview = React.useCallback(() => {
    if (webviewRef.current === null) {
      return;
    }
    webviewRef.current.style.border = '1px solid black';
    setTimeout(() => {
      webviewRef.current.style.border = 'none';
    }, 100)
  }, []);

  // eslint-disable-next-line react/prop-types
  const isGoogleEarth = src.includes(googleEarthString);

  return (
    <Container>
      {show && (
        <CSSToggleMenuWebView
          srcId={srcId}
          scale={scale}
          translateX={translateX}
          translateY={translateY}
          isFirstImage={isFirstImage}
          displayMode={displayMode}
        />
      )}
      {isGoogleEarth && <EarthMousePosition />}
      {isGoogleEarth && <EarthRefreshButton onClick={repaintWebview} />}
      {isGoogleEarth && <EarthNavigationButtons webviewRef={webviewRef} />}
      <webview
        key={src}
        ref={webviewRef}
        partition="no-xframe"
        scrolling="no"
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${scale}) translateX(${translateX}%) translateY(${translateY}%)`,
          // position: 'absolute',
          // width: '2543px',
          // height: '913px',
          // left: '-459px',
          // top: '-148px',
          // border: '0px',
          // overflow: 'hidden'
        }}
        src={src}
        // useragent={ua}
      />
      <ReloadButton reload={reload} />
    </Container>
  );
};

export default React.memo(WebView);
