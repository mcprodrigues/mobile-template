declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
