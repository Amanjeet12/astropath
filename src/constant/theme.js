import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#FF8E1D',
  brown: '##BFA054',
  btn: '#446C62',
  transparentPrimary: 'rgba(227, 120, 75, 0.4)',
  lightOrange: '#EDD498',
  white2: '#FBF8F2',
  white: '#FFFFFF',
  black: '#000000',
  borderColor: '#AEAEAE',
  lightBlue: '#F6F6F6',
  lightBlue2: '#9EA1AB',
  darkBlue: '#1E2742',
  transparent: 'transparent',
  transparentBlack1: 'rgba(0, 0, 0, 0.1)',
  transparentBlack7: 'rgba(0, 0, 0, 0.7)',
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  horizontal: 20,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  h5: 12,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

const appTheme = {COLORS, SIZES};

export default appTheme;
