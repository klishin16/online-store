'use client'
export const BACKEND_URL =  process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:4000/';

export const TOKEN_KEY = 'token';

export enum ERoutes {
    LOGIN = '/auth/login',
    REGISTRATION = '/auth/registration',
    ADMIN = '/admin',
    INDEX = '/',
    DEVICES = '/store/devices',
    BASKET = '/store/basket',
    PROFILE = '/profile'
}
