import { FC, ReactElement, Suspense, useRef, useState } from 'react';
import { FaArrowRight, FaCircleNotch, FaRegClock } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import StickyBox from 'react-sticky-box';
import RegisterModal from 'src/features/auth/components/Register';
import { useGetAuthGigByIdQuery } from 'src/features/auth/services/auth.service';
import { ISellerGig } from 'src/features/gigs/interfaces/gig.interface';
import Button from 'src/shared/button/Button';
import Header from 'src/shared/header/components/Header';
import HtmlParser from 'src/shared/html-parser/HtmlParser';
import CircularPageLoader from 'src/shared/page-loader/CircularPageLoader';
import StarRating from 'src/shared/rating/StarRating';
import { emptyGigData } from 'src/shared/utils/static-data';
import { rating, shortenLargeNumbers } from 'src/shared/utils/util.service';
import { v4 as uuidv4 } from 'uuid';

const GigInfoDisplay: FC = (): ReactElement => {
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const { gigId } = useParams<string>();
  const { data, isSuccess, isLoading } = useGetAuthGigByIdQuery(`${gigId}`);
  const gig = useRef<ISellerGig>(emptyGigData);
  if (isSuccess) {
    gig.current = data.gig as ISellerGig;
  }

  return (
    <>
      {showRegisterModal && (
        <Suspense>
          <RegisterModal
            onClose={() => setShowRegisterModal(false)}
            onToggle={() => {
              setShowRegisterModal(false);
            }}
          />
        </Suspense>
      )}
      <div className="flex w-screen flex-col">
        <Header navClass="navbar peer-checked:navbar-active relative z-20 w-full border-b border-gray-100 bg-white/90 shadow-2xl shadow-gray-600/5 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80 dark:shadow-none" />
      {
      isLoading ? (
        <CircularPageLoader />
      ) : (
        <div className="relative m-auto mt-8 min-h-screen w-screen px-6 xl:container md:px-12 lg:px-6">
            <main className="max-w-8xl container mx-auto mt-8">
              <h2 className="mb-4 px-4 text-xl font-bold text-[#404145] lg:text-3xl">{gig.current.title}</h2>
              <div className="mb-4 flex flex-row gap-x-2 px-4">
                <img className="flex h-8 w-8 self-center rounded-full object-cover" src={gig.current.profilePicture} alt="" />
                <span className="flex self-center font-extrabold">{gig.current.username}</span>
                {gig.current.ratingSum && gig.current.ratingsCount && gig.current.ratingSum >= 1 && gig.current.ratingsCount >= 1 ? (
                  <>
                    <span className="flex self-center">|</span>
                    <div className="flex w-full gap-x-1 self-center">
                      <div className="mt-1 w-20 gap-x-2">
                        <StarRating value={rating(gig.current.ratingSum / gig.current.ratingsCount)} size={14} />
                      </div>
                      <div className="ml-2 mt-[2px] flex gap-1 text-sm">
                        <span className="text-orange-400">{rating(gig.current.ratingSum / gig.current.ratingsCount)}</span>
                        <span className="">({shortenLargeNumbers(gig.current.ratingsCount)})</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
      )}</div>
    </>
  );
};

export default GigInfoDisplay;
