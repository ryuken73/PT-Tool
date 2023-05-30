import React from 'react';
import styled from 'styled-components';

const CustomImage = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    cursor: pointer;
    border-width: 2px;
    border-style: dashed;
    border-color: ${props => props.color};
    border-radius: 10px;
    opacity: 0.7;
`

function ImageIcon(props) {
    const {src, onClick, width='50px', height='50px', color} = props;
    return (
        <CustomImage
            src={src}
            onClick={onClick}
            width={width}
            height={height}
            color={color}
        ></CustomImage>
    )
}

export default React.memo(ImageIcon);
