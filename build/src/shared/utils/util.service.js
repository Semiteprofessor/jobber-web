import axios from 'axios';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';
import { filter } from 'lodash';
import millify from 'millify';
import { toast } from 'react-toastify';
import { logout } from '../../features/auth/reducers/logout.reducer';
import { authApi } from '../../features/auth/services/auth.service';
import { api } from '../../store/api';
countries.registerLocale(enLocale);
export const lowerCase = (str) => {
    return str.toLowerCase();
};
export const firstLetterUppercase = (str) => {
    const valueString = lowerCase(`${str}`);
    return `${valueString.charAt(0).toUpperCase()}${valueString.slice(1).toLowerCase()}`;
};
export const replaceSpacesWithDash = (title) => {
    const lowercaseTitle = lowerCase(`${title}`);
    return lowercaseTitle.replace(/\/| /g, '-'); // replace / and space with -
};
export const replaceDashWithSpaces = (title) => {
    const lowercaseTitle = lowerCase(`${title}`);
    return lowercaseTitle.replace(/-|\/| /g, ' '); // replace - / and space with -
};
export const replaceAmpersandWithSpace = (title) => {
    return title.replace(/&/g, '');
};
export const replaceAmpersandAndDashWithSpace = (title) => {
    const titleWithoutDash = replaceDashWithSpaces(title);
    return titleWithoutDash.replace(/&| /g, ' ');
};
export const categories = () => {
    return [
        'Graphics & Design',
        'Digital Marketing',
        'Writing & Translation',
        'Video & Animation',
        'Music & Audio',
        'Programming & Tech',
        'Photography',
        'Data',
        'Business'
    ];
};
export const expectedGigDelivery = () => {
    return [
        '1 Day Delivery',
        '2 Days Delivery',
        '3 Days Delivery',
        '4 Days Delivery',
        '5 Days Delivery',
        '6 Days Delivery',
        '7 Days Delivery',
        '10 Days Delivery',
        '14 Days Delivery',
        '21 Days Delivery',
        '30 Days Delivery',
        '45 Days Delivery',
        '60 Days Delivery',
        '75 Days Delivery',
        '90 Days Delivery'
    ];
};
export const countriesList = () => {
    const countriesObj = countries.getNames('en', { select: 'official' });
    return Object.values(countriesObj);
};
export const saveToSessionStorage = (data, username) => {
    window.sessionStorage.setItem('isLoggedIn', data);
    window.sessionStorage.setItem('loggedInUser', username);
};
export const getDataFromSessionStorage = (key) => {
    const data = window.sessionStorage.getItem(key);
    return JSON.parse(data);
};
export const saveToLocalStorage = (key, data) => {
    window.localStorage.setItem(key, data);
};
export const getDataFromLocalStorage = (key) => {
    const data = window.localStorage.getItem(key);
    return JSON.parse(data);
};
export const deleteFromLocalStorage = (key) => {
    window.localStorage.removeItem(key);
};
export const applicationLogout = (dispatch, navigate) => {
    const loggedInUsername = getDataFromSessionStorage('loggedInuser');
    dispatch(logout({}));
    if (loggedInUsername) {
        dispatch(authApi.endpoints.removeLoggedInUser.initiate(`${loggedInUsername}`, {
            track: false
        }));
    }
    dispatch(api.util.resetApiState());
    dispatch(authApi.endpoints.logout.initiate());
    saveToSessionStorage(JSON.stringify(false), JSON.stringify(''));
    deleteFromLocalStorage('becomeASeller');
    navigate('/');
};
export const isFetchBaseQueryError = (error) => {
    return typeof error === 'object' && error !== null && 'status' in error && 'data' in error;
};
export const orderTypes = (status, orders) => {
    const orderList = filter(orders, (order) => lowerCase(order.status) === lowerCase(status));
    return orderList.length;
};
export const sellerOrderList = (status, orders) => {
    const orderList = filter(orders, (order) => lowerCase(order.status) === lowerCase(status));
    return orderList;
};
export const degreeList = () => {
    return ['Associate', 'B.A.', 'B.Sc.', 'M.A.', 'M.B.A.', 'M.Sc.', 'J.D.', 'M.D.', 'Ph.D.', 'LLB', 'Certificate', 'Other'];
};
export const languageLevel = () => {
    return ['Basic', 'Conversational', 'Fluent', 'Native'];
};
export const yearsList = (maxOffset) => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= maxOffset; i++) {
        const year = currentYear - i;
        years.push(`${year}`);
    }
    return years;
};
export const shortenLargeNumbers = (data) => {
    if (data === undefined) {
        return '0';
    }
    return millify(data, { precision: 0 });
};
export const rating = (num) => {
    if (num) {
        return Math.round(num * 10) / 10;
    }
    return 0.0;
};
export const showSuccessToast = (message) => {
    toast.success(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored'
    });
};
export const showErrorToast = (message) => {
    toast.error(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored'
    });
};
export const reactQuillUtils = () => {
    const modules = {
        toolbar: [
            ['bold', 'italic'],
            [{ list: 'ordered' }, { list: 'bullet' }]
        ]
    };
    const formats = ['bold', 'italic', 'list', 'bullet'];
    return { modules, formats };
};
export const generateRandomNumber = (length) => {
    return Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) + Math.pow(10, length - 1);
};
export const bytesToSize = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
        return 'n/a';
    }
    const i = parseInt(`${Math.floor(Math.log(bytes) / Math.log(1024))}`, 10);
    if (i === 0) {
        return `${bytes} ${sizes[i]}`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
};
export const getFileBlob = async (url) => {
    const response = await axios.get(url, {
        responseType: 'blob'
    });
    return response;
};
export const downloadFile = (blobUrl, fileName) => {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', `${fileName}`);
    // Append to html link element page
    document.body.appendChild(link);
    // Start download
    link.click();
    // Clean up and remove link
    if (link.parentNode) {
        link.parentNode.removeChild(link);
    }
};
