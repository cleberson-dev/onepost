import React from 'react';
import SVG from 'react-inlinesvg';

interface SVGIconProps {
  src: string;
  color?: string;
  alt?: string;
}

const SVGIcon = ({ src, color = '#000000', alt='' }: SVGIconProps) => (
  <SVG 
    src={src}
    preProcessor={code => code.replace(/fill="\[here\]"/g, `fill="${color}"`)}
    description={alt} 
  />
);

export default SVGIcon;