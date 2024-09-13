import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { sliderImages, sliderImagesText } from 'src/shared/utils/static-data';
const HomeSlider = () => {
    const [slideState, setSlideState] = useState({
        slideShow: sliderImages[0],
        slideIndex: 0
    });
    const [sliderInterval, setSliderInterval] = useState();
    const [currentSliderImageText, setCurrentSliderImageText] = useState(sliderImagesText[0]);
    const { slideIndex, slideShow } = slideState;
    let currentSlideIndex = 0;
    useEffect(() => {
        const timeInterval = setInterval(() => {
            autoMoveSlide();
        }, 4000);
        setSliderInterval(timeInterval);
        return () => {
            clearInterval(timeInterval);
            clearInterval(sliderInterval);
        };
    }, []);
    const autoMoveSlide = () => {
        const lastIndex = currentSlideIndex + 1;
        currentSlideIndex = lastIndex >= sliderImages.length ? 0 : lastIndex;
        setCurrentSliderImageText(sliderImagesText[currentSlideIndex]);
        setSlideState((prev) => ({
            ...prev,
            slideIndex: currentSlideIndex,
            slideShow: sliderImages[currentSlideIndex]
        }));
    };
    return (_jsx("div", { className: "flex gap-x-8", children: _jsxs("div", { className: "relative h-96 w-full overflow-hidden bg-red-50", children: [_jsx("img", { alt: "slider", className: "absolute h-96 w-full object-cover transition", src: slideShow }), _jsxs("div", { className: "absolute px-6 py-4", children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: currentSliderImageText.header }), _jsx("h4", { className: "pt-1 text-white font-bold", children: currentSliderImageText.subHeader })] }), _jsx("div", { className: "absolute bottom-0 flex gap-3 px-6 py-4", children: sliderImages.map((_, index) => (_jsx("div", { className: `h-2 w-2 rounded-full ${slideIndex === index ? 'bg-sky-500' : 'bg-gray-300'}` }, index))) })] }) }));
};
export default HomeSlider;
