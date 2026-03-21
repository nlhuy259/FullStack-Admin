'use client'
import { useAdminContext } from '@/app/lib/admin.context';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { useContext } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';


const AdminHeader = () => {
    // const { data: session, status } = useSession();
    //const { session } = props;

    const { Header } = Layout;
    const { collapseMenu, setCollapseMenu } = useAdminContext()!;

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <span>
                    Settings
                </span>
            ),
        },

        {
            key: '4',
            danger: true,
            label: <span onClick={() => {}}>Đăng xuất</span>,
        },
    ];

    return (
        <>
            <Header
                style={{
                    padding: 0,
                    display: "flex",
                    background: "#f5f5f5",
                    justifyContent: "space-between",
                    alignItems: "center"
                }} >

                <Button
                    type="text"
                    icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapseMenu(!collapseMenu)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                    }}
                />
                <Dropdown menu={{ items }} >
                    <a onClick={(e) => e.preventDefault()}
                        style={{ color: "unset", lineHeight: "0 !important", marginRight: 20 }}
                    >
                        <Space>
                            {/* Welcome {session?.user?.email ?? ""} */}
							Welcome
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </Header>
        </>
    )
}

export default AdminHeader;