import React from 'react';
import styled from 'styled-components';
import useAssetState from 'renderer/hooks/useAssetState';
// import appUtil from 'renderer/lib/appUtil';
import RainDrop from 'renderer/assets/rain_drop1.jpg';
import Snow1 from 'renderer/assets/snow_1.jpg';
import Snow2 from 'renderer/assets/snow_2.jpg';
import Snow3 from 'renderer/assets/snow_3.jpg';

const HIDE_BLUR_BORDER_MARGIN = 20;
const DockContainer = styled.div`
  position: relative;
  height: 100%;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: grey;
  box-sizing: border-box;
`;
const InnerBox = styled.div`
  height: 100%;
  width: 100%;
  // filter: blur(20px);
  transition: 0.2s all;
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  width: ${(props) =>
    props.show ? `${parseInt(props.docWidth, 10)}px` : '0px'};
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    backdrop-filter: blur(20px);
  }
`;

// const { captureScreen } = appUtil;
function ToolDocker(props) {
  // eslint-disable-next-line react/prop-types
  const { show, docWidth } = props;
  const [dataUrls, setDataUrls] = React.useState([]);
  const { currentAssetIndex } = useAssetState();
  const docRef = React.useRef(null);

  const prevDataUrl = React.useMemo(() => {
    return dataUrls[currentAssetIndex] || RainDrop;
  }, [currentAssetIndex]);
  // remove dataUrls from dependency to reduce re-render

  React.useEffect(() => {
    if(docRef.current === null) return;
    docRef.current.style.backgroundImage = `url(${prevDataUrl})`;
    setTimeout(async () => {
      const currentDataUrl = await window.getCaptureImg(docRef.current);
      docRef.current.style.backgroundImage = `url(${currentDataUrl})`;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setDataUrls((dataUrls) => {
        const newDataUrls = [...dataUrls];
        newDataUrls[currentAssetIndex] = currentDataUrl;
        return newDataUrls;
      })
    }, 400);
  }, [currentAssetIndex, prevDataUrl]);
  return (
    <DockContainer>
      <InnerBox ref={docRef} show={show} docWidth={docWidth} />
    </DockContainer>
  );
}

export default React.memo(ToolDocker);
