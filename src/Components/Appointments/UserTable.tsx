import React from 'react';
import { Table, Input } from 'antd';
import { Slot } from '../../interfaces/Slot';
import { UserTableProps } from '../../interfaces/UserTable';

const UserTable: React.FC<UserTableProps> = ({ filteredUsers, onUserSelect, searchTerm, onSearchChange }) => {
    const columns = [
        {
            title: 'User Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a onClick={() => onUserSelect(text)}>{text}</a>,
        },
    ];

    const userTableData = filteredUsers.map((user, index) => ({
        key: index,
        name: user,
    }));

    return (
        <div className="p-4 bg-white rounded shadow">
            <h1 className="text-xl font-semibold mb-4">Users</h1>
            <Input
                placeholder="Search users"
                value={searchTerm}
                onChange={onSearchChange}
                className="mb-4"
            />
            <Table
                columns={columns}
                dataSource={userTableData}
                pagination={false}
            />
        </div>
    );
};

export default UserTable;
