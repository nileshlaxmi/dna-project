import React from 'react';
import './index.scss';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import prevIcon from 'assets/images/prev-icon.svg';
import nextIcon from 'assets/images/next-icon.svg';

import { Carousel } from 'react-responsive-carousel';
const ImageCarousel = ({ images_List }) => {
  const images = images_List.map(item => {
    return (
      <div>
        <img src={item}></img>
      </div>
    );
  });

  const arrowStyles = {
    position: 'absolute',
    border: 'none',
    background: '#ffff',
    zIndex: 2,
    top: 'calc(50% - 15px)',
    width: 50,
    height: 50,
    cursor: 'pointer',
  };

  return (
    <div className="image-carousel" onContextMenu={e => e.preventDefault()}>
      <Carousel
        showIndicators={false}
        showStatus={false}
        useKeyboardArrows={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, left: 15 }}
              className="arrow prev"
            >
              <img src={prevIcon}></img>
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              style={{ ...arrowStyles, right: 15 }}
              className="arrow next"
            >
              <img src={nextIcon}></img>
            </button>
          )
        }
      >
        {images}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
