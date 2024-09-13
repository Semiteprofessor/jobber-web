import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import HomeSlider from './HomeSlider';
import { useAppSelector } from 'src/store/store';
import { useGetSellerByUsernameQuery } from 'src/features/sellers/services/seller.service';
import { useGetTopRatedGigsByCategoryQuery } from 'src/features/gigs/services/gigs.service';
import { lowerCase } from 'src/shared/utils/util.service';
import { socketService } from 'src/sockets/socket.service';
import TopGigsView from 'src/shared/gigs/TopGigsView';
import HomeGigsView from './HomeGigsView';
const Home = () => {
    const authUser = useAppSelector((state) => state.authUser);
    const { data, isSuccess } = useGetSellerByUsernameQuery('10');
    const { data: categoryData, isSuccess: isCategorySuccess } = useGetSellerByUsernameQuery(`${authUser.username}`);
    const { data: topGigsData, isSuccess: isTopGigsSuccess } = useGetTopRatedGigsByCategoryQuery(`${authUser.username}`);
    let sellers = [];
    let categoryGigs = [];
    let topGigs = [];
    if (isSuccess) {
        (sellers = data.sellers);
    }
    if (isCategorySuccess) {
        categoryGigs = categoryData.gig;
    }
    if (isTopGigsSuccess) {
        topGigs = topGigsData.gigs;
    }
    useEffect(() => {
        socketService.setupSocketConnection();
    }, []);
    return (_jsxs("div", { className: "m-auto px-6 w-screen relative min-h-screen xl:container md:px-12", children: [_jsx(HomeSlider, {}), topGigs.length > 0 && (_jsx(TopGigsView, { gigs: topGigs, title: "Top rated service in", subTitle: `Highest rated talent for all your ${lowerCase(topGigs[0].categories)} need.`, category: topGigs[0].categories, width: "w-72", type: "home" })), categoryGigs.length > 0 && (_jsx(HomeGigsView, { gigs: categoryGigs, title: "Because you viewed a gig on", subTitle: "", category: categoryGigs[0].categories }))] }));
};
export default Home;
