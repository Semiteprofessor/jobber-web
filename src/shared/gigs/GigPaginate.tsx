import React, { FC, ReactElement } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { IGigPaginateProps, ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import { v4 as uuidv4 } from 'uuid';

let itemOffset = 1;

const GigPaginate: FC<IGigPaginateProps> = ({
  gigs,
  totalGigs,
  showNumbers,
  itemsPerPage,
  setItemFrom,
  setPaginationType
}): ReactElement => {
  const paginationCount: number[] = [...Array(Math.ceil((totalGigs as number) / itemsPerPage)).keys()];

  return (
    <div>
      <ul>
        <div
          className={`cursor-pointer p-3 ${itemOffset - 1 > 0 ? 'rounded-full border border-sky-400' : 'cursor-not-allowed text-gray-400'}`}
          onClick={() => {
            if (itemOffset - 1 > 0) {
              itemOffset -= 1;
              setPaginationType('backward');
              const firstItem: ISellerGig = gigs[0];
              setItemFrom(`${firstItem.sortId}`);
            }
          }}
        ><FaArrowLeft  className='flex self-center'/></div>
      </ul>
    </div>
  );
};

export default GigPaginate;
