import React, { Component } from 'react'

class LogoImg extends Component {
  render() {
      return (
          <svg xmlns="http://www.w3.org/2000/svg" width="580" height="400">
              <path fill="#fff" d="M-1 -1H581V401H-1z"></path>
              <g stroke="#000">
                  <ellipse
                      cx="171.5"
                      cy="138.953"
                      fill="#000"
                      strokeWidth="1.5"
                      rx="90"
                      ry="85.5"
                  ></ellipse>
                  <text
                      x="100.5"
                      y="149.453"
                      fill="#fff"
                      strokeOpacity="null"
                      strokeWidth="0"
                      fontFamily="Helvetica, Arial, sans-serif"
                      fontSize="24"
                      textAnchor="start"
                      xmlSpace="preserve"
                  >
                      APPROVIAL
        </text>
              </g>
          </svg>
      );
  }
}

export default LogoImg