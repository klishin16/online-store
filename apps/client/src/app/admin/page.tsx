'use client'
import { usePathname, useRouter } from "next/navigation";

const AdminPage = () => {
    const router = useRouter();
    router.push('/admin/statistics')

    return <></>
}

export default AdminPage;
