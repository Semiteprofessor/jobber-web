import React, { FC, ReactElement } from 'react';
import { IGigTopProps } from 'src/features/gigs/interfaces/gig.interface';

const TopGigsView: FC<IGigTopProps> = ({ gigs, title, subTitle, category, width, type }): ReactElement => {
  return <div>TopGigsView</div>;
};

export default TopGigsView;
