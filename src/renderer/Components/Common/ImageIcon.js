import React from 'react';
import styled from 'styled-components';

const CustomImage = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    cursor: pointer;
    // background: white;
    border-radius: 10px;
    opacity: 0.7;
`

function ImageIcon(props) {
    const {src, onClick, width='50px', height='50px'} = props;
    return (
        <CustomImage 
            src={src} 
            onClick={onClick}
            width={width}
            height={height}
        ></CustomImage>
    )
}

export default React.memo(ImageIcon);
