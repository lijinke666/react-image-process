import * as React from 'react';

export type ReactImageProcessMode =
  | 'base64'
  | 'clip'
  | 'compress'
  | 'rotate'
  | 'waterMark'
  | 'filter'
  | 'primaryColor';

export type ReactImageProcessWaterMarkType = 'image' | 'text';
export type ReactImageProcessFilterType =
  | 'vintage'
  | 'blackWhite'
  | 'relief'
  | 'blur';
export type ReactImageProcessOutputType = 'blob' | 'dataUrl';

export interface ReactImageProcessProps {
  mode?: ReactImageProcessMode;
  waterMarkType?: ReactImageProcessWaterMarkType;
  filterType?: ReactImageProcessFilterType;
  outputType?: ReactImageProcessOutputType;
  waterMark?: string;
  rotate?: number;
  quality?: number;
  coordinate?: number[];
  width?: number;
  height?: number;
  opacity?: number;
  fontColor?: number;
  fontSize?: number;
  fontBold?: number;
  onComplete?: (data: Blob | string) => void;
}

export default class ReactImageProcess extends React.PureComponent<
  ReactImageProcessProps,
  any
> {}
