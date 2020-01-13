import React from 'react';
import { Spring } from 'react-spring/renderprops';

import foldDemoImageSrc from '@assets/images/francois-hoang-china.jpg';
import foldMobileVideo from '@assets/videos/fold-mobile.mp4';

import SingleAxisDemo from '@components/SingleAxisDemo';
import FoldableImage from '@components/FoldableImage';
import VideoGif from '@components/VideoGif';

const FoldingDemo = ({ id }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 450;

  if (isMobile) {
    return <VideoGif src={foldMobileVideo} />;
  }

  return (
    <SingleAxisDemo showNote={true} defaultValue={100} id={id}>
      {percentage => {
        const width = 375;
        const height = width * (4 / 3);

        return (
          <Spring
            to={{ percentage }}
            config={{
              tension: 120,
              friction: 90,
            }}
          >
            {interpolated => (
              <FoldableImage
                alt="A neon alley with a Chinese sign"
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
