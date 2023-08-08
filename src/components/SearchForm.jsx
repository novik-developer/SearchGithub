import React, { useEffect, useState } from "react";
import api from "../API/api";
import UserList from "./UserList";

const PER_PAGE = 20;
const SORT_OPTIONS = {
    ASC: "asc",
    DESC: "desc",
};

const SearchForm = () => {
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleSubmit = (event) => {
        event.preventDefault();
        searchUsers(username);
    };

    const searchUsers = async () => {
        if (username) {
            try {
                const sortParam = sortBy
                    ? `&sort=repositories&order=${sortBy}`
                    : " ";

                const response = await api.get(
                    `users?q=${username}&per_page=${PER_PAGE}&page=${currentPage}${sortParam}`
                );
                setUsers(response.data.items);
            } catch (error) {
                console.log(error.message);
            }
        }
    };

    useEffect(() => {
        searchUsers();
    }, [currentPage, sortBy]);
    return (
        <>
            <form className="input-group" onSubmit={handleSubmit}>
                <input
                    className="form-control rounded"
                    type="search"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                    Поиск
                </button>
            </form>
            <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="">Кол-во репозиториев</option>
                <option value={SORT_OPTIONS.ASC}>Возростанию</option>
                <option value={SORT_OPTIONS.DESC}>Убыванию</option>
            </select>

            {users && (
                <UserList
                    users={users}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </>
    );
};
export default SearchForm;
