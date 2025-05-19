import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useGetGigsByCategoryQuery, useGetTopRatedGigsByCategoryQuery } from 'src/features/gigs/services/gigs.service';
import { useGetRandomSellersQuery } from 'src/features/sellers/services/seller.service';
import TopGigsView from 'src/shared/gigs/TopGigsView';
import { lowerCase } from 'src/shared/utils/util.service';
import { socketService } from 'src/sockets/socket.service';
import { useAppSelector } from 'src/store/store';
import FeaturedExperts from './FeaturedExperts';
import HomeGigsView from './HomeGigsView';
import HomeSlider from './HomeSlider';
const Home = () => {
    const authUser = useAppSelector((state) => state.authUser);
    const { data, isSuccess } = useGetRandomSellersQuery('10');
    const { data: categoryData, isSuccess: isCategorySuccess } = useGetGigsByCategoryQuery(`${authUser.username}`);
    const { data: topGigsData, isSuccess: isTopGigsSuccess } = useGetTopRatedGigsByCategoryQuery(`${authUser.username}`);
    // const { data: sellerData, isSuccess: isSellerDataSuccess } = useGetMoreGigsLikeThisQuery('6559d9a3620b7db8c1fb7f01');
    let sellers = [];
    let categoryGigs = [];
    let topGigs = [];
    if (isSuccess) {
        sellers = data.sellers;
    }
    if (isCategorySuccess) {
        categoryGigs = categoryData.gigs;
    }
    if (isTopGigsSuccess) {
        topGigs = topGigsData.gigs;
    }
    // if (isSellerDataSuccess) {
    //   topGigs = sellerData.gigs as ISellerGig[];
    // }
    useEffect(() => {
        socketService.setupSocketConnection();
    }, []);
    return (_jsxs("div", { className: "m-auto px-6 w-screen relative min-h-screen xl:container md:px-12 lg:px-6", children: [_jsx(HomeSlider, {}), topGigs.length > 0 && (_jsx(TopGigsView, { gigs: topGigs, title: "Top rated services in", subTitle: `Highest rated talents for all your ${lowerCase(topGigs[0].categories)} needs.`, category: topGigs[0].categories, width: "w-72", type: "home" })), categoryGigs.length > 0 && (_jsx(HomeGigsView, { gigs: categoryGigs, title: "Because you viewed a gig on", subTitle: "", category: categoryGigs[0].categories })), _jsx(FeaturedExperts, { sellers: sellers })] }));
};
export default Home;
