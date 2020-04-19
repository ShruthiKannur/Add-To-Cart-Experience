import React, { PureComponent } from 'react';
import DesktopContainer from './index.desktop.js';
import MobileContainer from './index.mobile.js';
import isSmallScreen from '../../device.js';

export default !isSmallScreen ? DesktopContainer : MobileContainer;
