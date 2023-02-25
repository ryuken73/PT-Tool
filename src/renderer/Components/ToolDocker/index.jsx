import React from 'react';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import AppControlMenu from 'renderer/Components/AppControlMenu';
import useAssetState from 'renderer/hooks/useAssetState';
import useConfigState from 'renderer/hooks/useConfigState';
import CONSTANTS from 'renderer/config/constants';
// import appUtil from 'renderer/lib/appUtil';
import RainDrop from 'renderer/assets/rain_drop1.jpg';
import Snow1 from 'renderer/assets/snow_1.jpg';
import Snow2 from 'renderer/assets/snow_2.jpg';
import Snow3 from 'renderer/assets/snow_3.jpg';
import { doc } from 'prettier';

const HIDE_BLUR_BORDER_MARGIN = 20;
const { TRANSITIONS } = CONSTANTS;
const DockContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  // border-width: 0 0 0 0;
  // border-style: solid;
  // border-color: yellow;
  box-sizing: border-box;
`;
  // background-position-x: ${(props) => `right ${props.docWidth}px`};
const InnerBox = styled.div`
  height: 100%;
  width: 100%;
  // filter: blur(20px);
  transition: 0.2s all;
  background-color: ${(props) => !props.backgroundCapture && 'black'};
  background-size: cover;
  background-position-x: center;
  background-repeat: no-repeat;
  box-sizing: border-box;
  transform: scaleX(-1);
  width: ${(props) =>
    props.show ? `${parseInt(props.docWidth, 10)}px` : '0px'};
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    backdrop-filter: blur(10px);
    // -webkit-mask-size: 100%;
    // -webkit-mask-image: linear-gradient(
    //   to right,
    //   rgba(0, 0, 0, 1) 0%,
    //   rgba(0, 0, 0, 0.3) 50%
    // );
  }
`;
const IconContainer = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10px;
  width: 100%;
  // left: 50%;
  // margin-top: auto;
  z-index: 9999;
`
const CustomSettingIcon = styled(SettingsIcon)`
  margin: 10px;
  z-index: 9999;
  opacity: 0.2;
  display: ${(props) => !props.show && 'none'};
`

// const { captureScreen } = appUtil;
function ToolDocker(props) {
  // eslint-disable-next-line react/prop-types
  const { show, docWidth, quitApp, setAssetsFromServer, transitionType } = props;
  const [dataUrls, setDataUrls] = React.useState([]);
  const { toggleConfigModalState, config } = useConfigState();
  const { currentAssetIndex } = useAssetState();
  const docRef = React.useRef(null);

  console.log('^^^^', docWidth)
  const { backgroundCapture } = config;
  const transition = TRANSITIONS[transitionType];
  const prevDataUrl = React.useMemo(() => {
    return dataUrls[currentAssetIndex] || RainDrop;
  }, [currentAssetIndex]);
  // remove dataUrls from dependency to reduce re-render

  React.useEffect(() => {
    if (docRef.current === null) return;
    if (!backgroundCapture) {
      docRef.current.style.backgroundImage = "none";
      return;
    }
    docRef.current.style.backgroundImage = `url(${prevDataUrl})`;
    setTimeout(async () => {
      if(docWidth === 0) return;
      // const currentDataUrl = await window.getCaptureImg(docRef.current);
      const currentDataUrl = await window.getCaptureImg(docWidth);
      // docRef.current.style.background = `linear-gradient(to right, rgba(0,0,0,0.1) 0%,rgba(0,0,0,1) 100%), url(${currentDataUrl})`;
      docRef.current.style.backgroundImage = `url(${currentDataUrl})`;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setDataUrls((dataUrls) => {
        const newDataUrls = [...dataUrls];
        newDataUrls[currentAssetIndex] = currentDataUrl;
        return newDataUrls;
      })
    }, transition.delay * 2);
  }, [currentAssetIndex, prevDataUrl, transition.delay, docWidth]);
  // }, [backgroundCapture, currentAssetIndex, prevDataUrl, transition.delay]);

  const onClickSetting = React.useCallback(() => {
    toggleConfigModalState();
  }, [toggleConfigModalState])

  return (
    <DockContainer>
      <InnerBox
        ref={docRef}
        show={show}
        docWidth={docWidth}
        backgroundCapture={backgroundCapture}
      />
      <AppControlMenu
        show={show}
        quitApp={quitApp}
        setAssetsFromServer={setAssetsFromServer}
      />
      <IconContainer show={show} docWidth={docWidth}>
        <CustomSettingIcon show={show} onClick={onClickSetting} />
      </IconContainer>
    </DockContainer>
  );
}

export default React.memo(ToolDocker);
