import axios from "axios";

const instance=axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '00f29180-c35c-415a-9fc9-4d442e2940fa'
    }
})

export const usersAPI={
    getUsers (currentPage:number,pageSize:number)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    getProfile (userId:string) {
        return instance.get(`profile/` + userId)
            .then(response => response.data)
    },

    follow(userId:number){
       return  instance.post(`follow/${userId}`)
    },
    unfollow(userId:number){
        return instance.delete(`follow/${userId}`)
    }
}




