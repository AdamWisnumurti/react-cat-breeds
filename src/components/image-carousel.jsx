import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export const ImageCarousel = ({ imageList }) => {
  const MyView = imageList?.slice(0, 5)?.map((item, key) => {
    return (
      <div className="carousel-content" key={item?.id || key}>
        <div
          className="h-44 w-64 rounded-sm sm:w-48"
          style={{
            backgroundImage: `url(${item.url})`,
            backgroundPosition: `center center`,
          }}
        ></div>
      </div>
    );
  });

  // Responsive Carousel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    largeDesktop: {
      breakpoint: { max: 3000, min: 1600 },
      items: 3,
      partialVisibilityGutter: 30,
    },
    desktop: {
      breakpoint: { max: 1600, min: 992 },
      items: 3,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 992, min: 669 },
      items: 2,
      partialVisibilityGutter: 10,
    },
    mobile: {
      breakpoint: { max: 670, min: 550 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile2: {
      breakpoint: { max: 549, min: 0 },
      items: 1,
      partialVisibilityGutter: 90,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      arrows={false}
      autoPlay={true}
      infinite={true}
      //   renderButtonGroupOutside={true}
      additionalTransfrom={0}
      minimumTouchDrag={80}
      partialVisible
      //   customButtonGroup={<ButtonGroup />}
    >
      {MyView}
    </Carousel>
  );
};

export default ImageCarousel;
