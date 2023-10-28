import React from "react";
import {UsersType} from "../redux/users-reducer";

export const updateObjectInArray = (items:UsersType[],itemId:number, objPropName:keyof UsersType, newObjProps:{followed: boolean}) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps}
        }
        return u
    })
}