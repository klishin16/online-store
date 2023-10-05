'use client'
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export const useAuthSession = () => {
    const { isAuthenticated, user } = useTypedSelector(state => state.auth);
    const pathname = usePathname();
    const router = useRouter()
    useEffect(() => {
        if (!isAuthenticated) router.push(`/auth/login?continue=${pathname}`);
    }, [isAuthenticated]);
    return user;
}