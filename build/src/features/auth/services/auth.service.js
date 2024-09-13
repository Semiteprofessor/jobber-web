import { api } from 'src/store/api';
export const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        signUp: build.mutation({
            query(body) {
                return {
                    url: '/auth/signup',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['Auth']
        }),
        signIn: build.mutation({
            query(body) {
                return {
                    url: '/auth/signin',
                    method: 'POST',
                    body
                };
            },
            invalidatesTags: ['Auth']
        }),
        logout: build.mutation({
            query() {
                return {
                    url: 'auth/signout',
                    method: 'POST',
                    body: {}
                };
            },
            invalidatesTags: ['Auth']
        }),
        resendEmail: build.mutation({
            query(data) {
                return {
                    url: 'auth/resend-email',
                    method: 'POST',
                    body: data
                };
            },
            invalidatesTags: ['Auth']
        }),
        verifyEmail: build.mutation({
            query(token) {
                return {
                    url: 'auth/verify-email',
                    method: 'PUT',
                    body: { token }
                };
            },
            invalidatesTags: ['Auth']
        }),
        verifyOTP: build.mutation({
            query(data) {
                return {
                    url: `auth/verify-otp/${data.otp}`,
                    method: 'PUT',
                    body: {
                        browserName: data.browserName,
                        deviceType: data.deviceType
                    }
                };
            },
            invalidatesTags: ['Auth']
        }),
        forgotPassword: build.mutation({
            query(email) {
                return {
                    url: 'auth/forgot-password',
                    method: 'PUT',
                    body: { email }
                };
            },
            invalidatesTags: ['Auth']
        }),
        resetPassword: build.mutation({
            query(data) {
                return {
                    url: `auth/reset-password/${data.token}`,
                    method: 'PUT',
                    body: data
                };
            },
            invalidatesTags: ['Auth']
        }),
        checkCurrentUser: build.query({
            query: () => 'auth/currentuser',
            providesTags: ['Currentuser']
        }),
        getLoggedInUser: build.query({
            query: () => 'auth/logged-in-user',
            providesTags: ['Auth']
        }),
        removeLoggedInUser: build.mutation({
            query(username) {
                return {
                    url: `auth/logged-in-user/${username}`,
                    method: 'DELETE'
                };
            }
        }),
        getAuthGigsByCategory: build.query({
            query: ({ query, from, size, type }) => `auth/search/gig/${from}/${size}/${type}?${query}`,
            providesTags: ['Auth']
        }),
        getAuthGigById: build.query({
            query: (gigId) => `auth/search/gig/${gigId}`,
            providesTags: ['Auth']
        })
    })
});
export const { useGetAuthGigsByCategoryQuery, useCheckCurrentUserQuery, useGetLoggedInUserQuery, useGetAuthGigByIdQuery, useSignUpMutation, useSignInMutation, useRemoveLoggedInUserMutation, useLogoutMutation, useResendEmailMutation, useVerifyEmailMutation, useVerifyOTPMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
