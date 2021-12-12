import React, {Component} from "react";

import "./index.scss";

/**
 * 直角徽章
 */
class RightAngleBadge extends Component {
  render() {
    const {children} = this.props;
    return(
      <div className="RightAngleBadgeContainer">
        {children}
      </div>
    );
  }
}

export default RightAngleBadge;