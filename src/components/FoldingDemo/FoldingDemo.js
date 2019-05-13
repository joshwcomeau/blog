import React from 'react';
import { Spring } from 'react-spring';

import foldDemoImageSrc from '@assets/images/francois-hoang-china.jpg';

import SingleAxisDemo from '@components/SingleAxisDemo';
import FoldableImage from '@components/FoldableImage';
import WindowDimensions from '../WindowDimensions/WindowDimensions';

const FoldingDemo = ({ id }) => {
  return (
    <WindowDimensions>
      {({ windowWidth }) => (
        <SingleAxisDemo showNote={true} defaultValue={100} id={id}>
          {percentage => {
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
      )}
    </WindowDimensions>
  );
};

export default FoldingDemo;
