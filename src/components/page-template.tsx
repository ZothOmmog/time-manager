import React from "react";
import { Layout, Menu } from "antd";
import { useHistory, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

export const PageTemplate: React.FC<unknown> = ({ children }) => {
    const history = useHistory();
    const { pathname } = useLocation();
    
    return (
        <Layout>
            <Header>
                <Menu
                    theme='dark'
                    mode='horizontal'
                    defaultSelectedKeys={[pathname]}
                    onSelect={({ key }) => history.push(key as string)}
                >
                    <Menu.Item key="/">Ежедневник</Menu.Item>
                    <Menu.Item key="/tasks">Детально по таскам</Menu.Item>
                    <Menu.Item key="/time">Детально по времени</Menu.Item>
                </Menu>
            </Header>
            <Content style={{
                margin: '32px',
                padding: '16px',
                backgroundColor: 'white',
                height: 'calc(100vh - 128px)'
            }}>
                {children}
            </Content>
        </Layout>
    );
}