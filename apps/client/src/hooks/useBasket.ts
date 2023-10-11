'use client'
import { useAppDispatch, useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/models";
import { TOKEN_KEY } from "@/constants";
import { AuthService, UsersService } from "@/services";
import authSlice, { authActions } from "@/redux/features/auth.slice";
import { basketActions } from "@/redux/features/basket.slice";

export const useBasket = () => {
    const { user } = useTypedSelector(state => state.auth);
    const { id: basket_id, purchases } = useTypedSelector(state => state.basket);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log('useBasket', user, basket_id)
        if (user) {
            if (!basket_id) {
                console.log('loadBasket')
                dispatch(basketActions.loadUserBasket(user)).then((v) => {
                    console.log('loadUserBasket result', v)
                });
            }
        } else {
            console.log('Local basket not implemented yet')
        }
        // if (typeof window !== 'undefined') {
        //     if (!stateUser) {
        //         const localStorageToken = localStorage.getItem(TOKEN_KEY);
        //         if (localStorageToken) {
        //             AuthService.profile(localStorageToken)
        //                 .then((profile) => {
        //                     dispatch(authActions.setUser(profile))
        //                 })
        //                 .catch(() => {
        //                     console.log('Unauthorized')
        //                 })
        //         }
        //     }
        // }
    }, [user]);


    return {
        id: basket_id,
        purchases: purchases ?? []
    };
}
