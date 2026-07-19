import React from 'react';
import Svg, {Circle, Line, Path, Polygon} from 'react-native-svg';

export type IconName =
  | 'search'
  | 'zap'
  | 'target'
  | 'leaf'
  | 'home'
  | 'clock'
  | 'user'
  | 'alert-triangle'
  | 'sparkles'
  | 'check-circle';

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

/**
 * Hand-drawn line-icon set (search/zap/target/leaf/home/clock/user/alert/
 * sparkles/check) built on react-native-svg, which is already a dependency —
 * avoids adding a new icon-font native module this close to submission.
 */
export function Icon({
  name,
  size = 24,
  color = '#000000',
  strokeWidth = 2,
}: IconProps): React.JSX.Element {
  const stroke = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'search' && (
        <>
          <Circle cx={11} cy={11} r={7} {...stroke} />
          <Line x1={21} y1={21} x2={16.2} y2={16.2} {...stroke} />
        </>
      )}
      {name === 'zap' && (
        <Polygon
          points="13,2 4,14 11,14 10,22 20,10 13,10 13,2"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fill={color}
          fillOpacity={0.15}
        />
      )}
      {name === 'target' && (
        <>
          <Circle cx={12} cy={12} r={9} {...stroke} />
          <Circle cx={12} cy={12} r={5.5} {...stroke} />
          <Circle cx={12} cy={12} r={2} fill={color} stroke="none" />
        </>
      )}
      {name === 'leaf' && (
        <Path d="M6 20C6 12 12 6 20 6C20 14 14 20 6 20Z M6 20C9 17 12 14 16 10" {...stroke} />
      )}
      {name === 'home' && <Path d="M4 11L12 4L20 11V20H14V14H10V20H4V11Z" {...stroke} />}
      {name === 'clock' && (
        <>
          <Circle cx={12} cy={12} r={9} {...stroke} />
          <Path d="M12 7V12L15.5 14" {...stroke} />
        </>
      )}
      {name === 'user' && (
        <>
          <Circle cx={12} cy={8} r={4} {...stroke} />
          <Path d="M4 20C4 15.6 7.6 13 12 13C16.4 13 20 15.6 20 20" {...stroke} />
        </>
      )}
      {name === 'alert-triangle' && (
        <>
          <Path d="M12 3L22 20H2Z" {...stroke} />
          <Line x1={12} y1={9} x2={12} y2={14} {...stroke} />
          <Circle cx={12} cy={17} r={0.9} fill={color} stroke="none" />
        </>
      )}
      {name === 'sparkles' && (
        <Path
          d="M12 2L13.6 9.4L21 11L13.6 12.6L12 20L10.4 12.6L3 11L10.4 9.4Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fill={color}
          fillOpacity={0.2}
        />
      )}
      {name === 'check-circle' && (
        <>
          <Circle cx={12} cy={12} r={9} {...stroke} />
          <Path d="M8 12.5L10.5 15L16 9" {...stroke} />
        </>
      )}
    </Svg>
  );
}
