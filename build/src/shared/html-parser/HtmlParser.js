import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import parse, { Element } from 'html-react-parser';
const HtmlParser = ({ input }) => {
    const parser = (input) => {
        const options = {
            replace: (domNode) => {
                if (domNode instanceof Element && domNode.firstChild && domNode.firstChild['name'] === 'br') {
                    return _jsx(_Fragment, {});
                }
            }
        };
        return _jsx(_Fragment, { children: parse(input, options) });
    };
    return _jsx(_Fragment, { children: parser(input) });
};
export default HtmlParser;
