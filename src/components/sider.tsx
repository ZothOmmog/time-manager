import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { ExportOutlined, ImportOutlined, PlusOutlined } from '@ant-design/icons';
import { openCreateForm } from '../models/diary-item-create-form/diary-item-create-form-model';
import styled from 'styled-components';

const { Sider } = Layout;

export const SiderTm = () => {
    const [collapsed, setCollapsed] = useState(true);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <LogoContainer />
            <Menu theme='dark' selectable={false} mode='inline'>
                <Menu.Item icon={<PlusOutlined />} onClick={() => openCreateForm()}>
                    Добавить запись
                </Menu.Item>
                <Menu.Item icon={<ExportOutlined />}>Экспорт таблицы</Menu.Item>

                <Menu.Item icon={<ImportOutlined />}>Импорт таблицы</Menu.Item>
                <Menu.Item key='9'>Files</Menu.Item>
            </Menu>
        </Sider>
    );
};

const LogoContainer = styled.div`
    height: 64px;
    width: 100%;
`;