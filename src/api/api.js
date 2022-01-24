import * as axios from 'axios';

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
    follow (id) {
        return instance.post(`follow/${id}`).then(res => res.data)
    },
    unfollow (id) {
        return instance.delete(`follow/${id}`).then(res => res.data)
    },
    getUserProfile (userId) {
        console.warn('Obsolete method. Please use profileAPI object')
        return profileAPI.getUserProfile(userId)
    }
    
}

export const profileAPI =  {
    getUserProfile (userId) {
        return instance.get(`profile/${userId}`)
    },
    getUserStatus (userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateUserStatus (status) {
        return instance.put(`profile/status`, {status})
    },
    savePhoto (photoFile) {
        const formData = new FormData();
        formData.append('image', photoFile);

        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile (profile) {
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {
    auth () {
        return instance.get('auth/me')
    },
    login (email, password, rememberMe = false, captcha =  null) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
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