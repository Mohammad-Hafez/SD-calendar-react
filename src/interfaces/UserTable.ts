export interface UserTableProps {
    filteredUsers: string[];
    onUserSelect: (userName: string) => void;
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
