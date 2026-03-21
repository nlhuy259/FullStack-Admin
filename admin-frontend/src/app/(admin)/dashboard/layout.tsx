//import { auth } from '@/app/auth';
import AdminContent from '@/app/components/layout/admin.content';
import AdminFooter from '@/app/components/layout/admin.footer';
import AdminHeader from '@/app/components/layout/admin.header';
import AdminSideBar from '@/app/components/layout/admin.sidebar';
import { AdminContextProvider } from '@/app/lib/admin.context';

const AdminLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    //const session = await auth()

    return (
        <AdminContextProvider>
            <div style={{ display: "flex" }}>
                <div className='left-side' style={{ minWidth: 80 }}>
                    <AdminSideBar />
                </div>
                <div className='right-side' style={{ flex: 1 }}>
                    <AdminHeader />
                        <AdminContent>
                            {children}
                        </AdminContent>
                    <AdminFooter />
                </div>
            </div>
        </AdminContextProvider>
    )
}

export default AdminLayout