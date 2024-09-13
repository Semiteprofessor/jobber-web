import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppDispatch } from 'src/store/store';
import HeaderSearchInput from '../HeaderSearchInput';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { updateHeader } from '../../reducers/header.reducer';
import { updateCategoryContainer } from '../../reducers/category.reducer';
import Button from 'src/shared/button/Button';
const MobileHeaderSearchInput = ({ setOpenSidebar }) => {
    const dispatch = useAppDispatch();
    return (_jsxs("div", { className: "flex w-full flex-col gap-y-3 md:hidden", children: [_jsxs("div", { className: "flex w-full gap-x-1", children: [_jsx("label", { htmlFor: "hbr", className: "peer-checked:hamburger relatives z-20 -ml-4 cursor-pointer px-4 py-6", children: _jsx(Button, { className: "m-auto flex h-0.5 w-5 items-center rounded transition duration-300", onClick: () => {
                                if (setOpenSidebar) {
                                    setOpenSidebar(true);
                                }
                            }, label: _jsx(FaBars, { className: "h-6 w-6 text-sky-500" }) }) }), _jsx(Link, { to: "/", onClick: () => {
                            dispatch(updateHeader('home'));
                            dispatch(updateCategoryContainer(true));
                        }, className: "relative z-10 flex w-full cursor-pointer justify-center self-center pr-12 text-2xl font-bold text-black lg:text-3xl", children: "Jobber" })] }), _jsx(HeaderSearchInput, {})] }));
};
export default MobileHeaderSearchInput;
