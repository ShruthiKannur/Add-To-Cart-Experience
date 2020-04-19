import desktopThemes from './desktopThemes.js';
import mobileThemes from './mobileThemes.js';
import isSmallScreen from '../device.js';

export default !isSmallScreen ? desktopThemes : mobileThemes;
//export default desktopThemes;
