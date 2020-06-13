import React from "react";
import styles from "./index.scss";

const SvgIcon = props => {
  const { iconClass, fill } = props;

  return (
    <i aria-hidden="true" className="antioch">
      <svg className={styles["svg-class"]}>
        <use xlinkHref={`#icon-${iconClass}`} fill={fill} />
      </svg>
    </i>
  );
};

SvgIcon.defaultProps = {
  fill: "currentColor",
};

export default SvgIcon;
