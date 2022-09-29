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
// const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; Touch) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.174 Electron/16.1.0 Safari/537.36"
// const ua = "Mozilla/5.0 (iPad; CPU OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/87.0.4280.77 Mobile/15E148 Safari/604.1";
// const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; ServiceUI 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"
// const ua = "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36";
// const ua = "Mozilla/5.0 (Linux; Android 11.0; Surface Duo) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Mobile Safari/537.36"
// const ua = "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Mobile Safari/537.36";

const earthString = 'earth.nullschool.net';
const weatherStrig = 'weather.go.kr';
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
  const { src } = props.asset;
  const srcIsArray = Array.isArray(src);
  const srcArray = srcIsArray ? src : [src];
  const webviewRefs = srcArray.map(() => React.useRef(null));

  React.useEffect(() => {
    if(srcArray.length === 0) return;
    const firstWebview = webviewRefs[0].current;
    if(srcArray[0].includes(earthString)){
      firstWebview.addEventListener('dom-ready', () => {
        earthCSS.forEach((css) => firstWebview.insertCSS(css));
        firstWebview.setZoomFactor(0.67);
      });
    }
    if(srcArray[0].includes(weatherStrig)){
      firstWebview.addEventListener('dom-ready', () => {
        weatherCSS.forEach((css) => firstWebview.insertCSS(css));
      });
    }
  }, [srcArray, webviewRefs]);

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
          // useragent={ua}
        />
      ))}
      <ReloadButton reload={reload} />
    </Container>
  )
}

export default React.memo(WebView);
