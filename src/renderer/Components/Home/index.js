import React from 'react';
import ImageBox from 'renderer/Components/Common/ImageBox';
import homeImage from 'renderer/assets/home.png';
import useAppState from 'renderer/hooks/useAppState';

function Home(props) {
  const { setHomeShowState } = useAppState();
  const { homeSrc = homeImage } = props;
  const onClickImage = React.useCallback(() => {
    setHomeShowState(false);
  }, []);
  // eslint-disable-next-line react/jsx-filename-extension
  return <ImageBox onClick={onClickImage} src={homeSrc} />;
}

export default React.memo(Home);
