import React from "react";
import UserItem from "./UserItem";
const UserList = ({ users, setCurrentPage, currentPage }) => {
    return (
        <>
            <ul className="list-group">
                {users.map((user) => (
                    <UserItem key={user.id} user={user} users={users} />
                ))}
            </ul>
            <button
                className="btn btn-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous Page
            </button>
            <button
                className="btn btn-primary"
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next Page
            </button>
        </>
    );
};
export default UserList;
