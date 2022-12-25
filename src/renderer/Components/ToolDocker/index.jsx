import React from 'react';
import styled from 'styled-components';
import useAssetState from 'renderer/hooks/useAssetState';
// import appUtil from 'renderer/lib/appUtil';
import RainDrop from 'renderer/assets/rain_drop1.jpg';
import Snow1 from 'renderer/assets/snow_1.jpg';
import Snow2 from 'renderer/assets/snow_2.jpg';
import Snow3 from 'renderer/assets/snow_3.jpg';

const DockContainer = styled.canvas`
  height: 100%;
  border-width: 0 1px 1px 0;
  border-style: solid;
  border-color: grey;
  box-sizing: border-box;
  width: ${(props) => (props.show ? `${props.docWidth}px` : '0px')};
  transition: 0.5s all;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0.5)
    ),
    url(${RainDrop});
  background-size: cover;
`;

// const { captureScreen } = appUtil;
function ToolDocker(props) {
  // eslint-disable-next-line react/prop-types
  const { show, docWidth } = props;
  const { currentAssetIndex } = useAssetState();
  React.useEffect(() => {

  }, [currentAssetIndex])
  return <DockContainer show={show} docWidth={docWidth} />;
}

export default React.memo(ToolDocker);
