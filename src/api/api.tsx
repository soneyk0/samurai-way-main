import axios from "axios";
import {ProfileModel} from "../redux/profile-reducer";
import {UserModel} from "../redux/auth-reducer";
import {ProfileFormDataType} from "../components/Profile/ProfileInfo/ProfileDataForm";
import {LoginFormData} from "../components/Login/Login";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'c8eb11ac-6b92-4739-b403-c5a77b3af2e2'
    }
})

export type BaseResponse<T> = {
    data: T
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    getProfile(userId: string) {
        return profileAPI.getProfile(userId)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    }
}

export const authAPI = {
    me() {
        return instance.get<BaseResponse<Required<UserModel>>>(`auth/me`);
    },
    login(payload:LoginFormData) {
        return instance.post(`auth/login`, payload);
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const profileAPI = {
    getProfile(userId: string) {
        return instance.get<ProfileModel>(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileFormDataType) {
        console.log(profile)
        return instance.put(`profile`, profile)
    }
}

export const securityAPI = {
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`);
    },
}










