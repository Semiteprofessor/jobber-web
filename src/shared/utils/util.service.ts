import { Dispatch } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import countries, { LocalizedCountryNames } from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { filter } from "lodash";
import millify from "millify";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "src/features/auth/reducers/logout.reducer";
import { authApi } from "src/features/auth/services/auth.service";
import { IOrderDocument } from "src/features/order/interfaces/order.interface";
import { api } from "src/store/api";

countries.registerLocale(enLocale);

export const lowerCase = (str: string): string => {
  return str.toLowerCase();
};

export const firstLetterUppercase = (str: string): string => {
  const valueString = lowerCase(`${str}`);
  return `${valueString.charAt(0).toUpperCase()}${valueString.slice(1).toLowerCase()}`;
};

export const replaceSpacesWithDash = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/\/| /g, "-"); // replace / and space with -
};

export const replaceDashWithSpaces = (title: string): string => {
  const lowercaseTitle: string = lowerCase(`${title}`);
  return lowercaseTitle.replace(/-|\/| /g, " "); // replace - / and space with -
};

export const replaceAmpersandWithSpace = (title: string): string => {
  return title.replace(/&/g, "");
};

export const replaceAmpersandAndDashWithSpace = (title: string): string => {
  const titleWithoutDash = replaceDashWithSpaces(title);
  return titleWithoutDash.replace(/&| /g, " ");
};

export const categories = (): string[] => {
  return [
    "Graphics & Design",
    "Digital Marketing",
    "Writing & Translation",
    "Video & Animation",
    "Music & Audio",
    "Programming & Tech",
    "Photography",
    "Data",
    "Business",
  ];
};

export const expectedGigDelivery = (): string[] => {
  return [
    "1 Day Delivery",
    "2 Days Delivery",
    "3 Days Delivery",
    "4 Days Delivery",
    "5 Days Delivery",
    "6 Days Delivery",
    "7 Days Delivery",
    "10 Days Delivery",
    "14 Days Delivery",
    "21 Days Delivery",
    "30 Days Delivery",
    "45 Days Delivery",
    "60 Days Delivery",
    "75 Days Delivery",
    "90 Days Delivery",
  ];
};

export const countriesList = (): string[] => {
  const countriesObj: LocalizedCountryNames<{ select: "official" }> =
    countries.getNames("en", { select: "official" });
  return Object.values(countriesObj);
};

export const saveToSessionStorage = (data: string, username: string): void => {
  window.sessionStorage.setItem("isLoggedIn", data);
  window.sessionStorage.setItem("loggedInUser", username);
};
