import React from "react";

const UserItem = ({ user }) => {
    return (
        <li className="list-group-item">
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
            </a>
        </li>
    );
};
export default UserItem;
