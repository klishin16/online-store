'use client'
import { useAppDispatch, useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/models";
import { TOKEN_KEY } from "@/constants";
import { AuthService, UsersService } from "@/services";
import authSlice, { authActions } from "@/redux/features/auth.slice";

export const useAuthSession = (): [IUser | null] => {
    const { user: stateUser } = useTypedSelector(state => state.auth);
    const dispatch = useAppDispatch()
    const pathname = usePathname();
    const router = useRouter();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         router.push(`/auth/login?continue=${pathname}`);
    //     } else {
    //         router.push(`/store/devices`);
    //     }
    // }, [isAuthenticated]);
    useEffect(() => {
        console.log('useAuthSession')
        if (typeof window !== 'undefined') {
            if (!stateUser) {
                const localStorageToken = localStorage.getItem(TOKEN_KEY);
                if (localStorageToken) {
                    AuthService.profile(localStorageToken)
                        .then((profile) => {
                            dispatch(authActions.setToken(localStorageToken))
                            dispatch(authActions.setUser(profile))
                        })
                        .catch(() => {
                            console.log('Unauthorized')
                        })
                }
            }
        }
    }, []);


    return [stateUser];
}