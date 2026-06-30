declare module 'react-responsive-masonry' {
  import * as React from 'react';

  export interface MasonryProps {
    columnsCount?: number;
    columnsCountBreakPoints?: Record<number, number>;
    gutter?: string;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  const Masonry: React.FC<MasonryProps>;

  export default Masonry;
}
