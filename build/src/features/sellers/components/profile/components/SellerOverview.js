import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SellerContext } from 'src/features/sellers/context/SellerContext';
import AboutMe from './overview/aboutme/AboutMe';
import Certifications from './overview/certifications/Certifications';
import Description from './overview/description/Description';
import Education from './overview/education/Education';
import Experience from './overview/experience/Experience';
import Language from './overview/language/Language';
import Skills from './overview/skills/Skills';
import SocialLinks from './overview/sociallinks/SocialLinks';
const SellerOverview = ({ sellerProfile, setSellerProfile, showEditIcons }) => {
    return (_jsxs(SellerContext.Provider, { value: { showEditIcons, setSellerProfile, sellerProfile: sellerProfile }, children: [_jsxs("div", { className: "w-full py-4 lg:w-1/3", children: [_jsx(Language, {}), _jsx(AboutMe, {}), _jsx(SocialLinks, {}), _jsx(Certifications, {})] }), _jsxs("div", { className: "w-full pl-4 py-4 lg:w-2/3", children: [_jsx(Description, {}), _jsx(Experience, {}), _jsx(Education, {}), _jsx(Skills, {})] })] }));
};
export default SellerOverview;
