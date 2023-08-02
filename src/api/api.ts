import axios from 'axios';
import { ProfileType } from '../Types/types';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '5d1c0244-8a4e-4759-bbd0-0501bfb630c1'
    }
})

export const usersAPI =  {
    getUsers (currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
    },
    follow (id: number) {
        return instance.post(`follow/${id}`).then(res => res.data)
    },
    unfollow (id: number) {
        return instance.delete(`follow/${id}`).then(res => res.data)
    },
    getUserProfile (userId: number) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getUserProfile(userId)
    }
}

export const profileAPI =  {
    getUserProfile (userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getUserStatus (userId: number) {
        return instance.get(`profile/status/${userId}`)
    },
    updateUserStatus (status: string) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto (photoFile: any) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile (profile: ProfileType) {
        return instance.put(`profile`, profile)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResultCodesForCaptchaEnum {
    CaptchaIsRequired = 10
}

type AuthAPITypes = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginAPITypes = {
    data: { userId: number }
    resultCode: ResultCodesEnum | ResultCodesForCaptchaEnum
    messages: Array<string>
}

export const authAPI = {
    auth () {
        return instance.get<AuthAPITypes>('auth/me').then(res => res.data)
    },
    login (email: string, password: string, rememberMe = false, captcha: null | string =  null) {
        return instance.post<LoginAPITypes>('auth/login', {email, password, rememberMe, captcha})
            .then(res => res.data);
    },
    logout () {
        return instance.delete('auth/login')
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}