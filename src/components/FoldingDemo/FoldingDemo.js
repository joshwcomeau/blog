import React from 'react';
import { Spring } from 'react-spring';

import foldDemoImageSrc from '@assets/images/francois-hoang-china.jpg';
import useWindowDimensions from '@hooks/window-dimensions.hook';

import SingleAxisDemo from '@components/SingleAxisDemo';
import FoldableImage from '@components/FoldableImage';

const FoldingDemo = ({ id }) => {
  return (
    <SingleAxisDemo showNote={true} defaultValue={100} id={id}>
      {percentage => {
        const { width: windowWidth } = useWindowDimensions();

        console.log(windowWidth);

        const width = Math.min(375, windowWidth * 0.5);
        const height = width * (4 / 3);

        return (
          <Spring
            to={{ percentage }}
            config={{
              tension: 60,
              friction: 13,
            }}
          >
            {interpolated => (
              <FoldableImage
                width={width}
                height={height}
                percentage={interpolated.percentage}
                src={foldDemoImageSrc}
              />
            )}
          </Spring>
        );
      }}
    </SingleAxisDemo>
  );
};

export default FoldingDemo;
