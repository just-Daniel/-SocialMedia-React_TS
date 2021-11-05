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
        return instance.get(`profile/${userId}`)
    }
    
}
// export const getUsers = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)
// }

// export const followUsers = (id) => {
//     return instance.post(`follow/${id}`).then(res => res.data)
// }


export const authAPI = {
    auth () {
        return instance.get('auth/me')
    }
}