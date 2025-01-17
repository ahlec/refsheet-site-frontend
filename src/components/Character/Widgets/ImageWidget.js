import React from "react";
import PropTypes from "prop-types";
import ProgressiveImage from "components/Shared/ProgressiveImage";
import Logo from "assets/images/logos/RefsheetLogo_White_200.png";

const ImageWidget = ({ imageSrc, alt, caption }) => (
  <div className="image-widget">
    <ProgressiveImage src={imageSrc} placeholder={Logo}>
      {(src, loading) => (
        <img
          style={{ opacity: loading ? 0.5 : 1 }}
          src={src}
          alt={alt}
          className="responsive-img block"
        />
      )}
    </ProgressiveImage>

    {caption && caption.length > 0 && (
      <div className="image-caption muted card-content">{caption}</div>
    )}
  </div>
);

ImageWidget.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string,
  caption: PropTypes.string,
};

export default ImageWidget;
