import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import SearchForm from "../components/SearchForm";

jest.mock("axios"); // Мокаем axios для тестирования

describe("SearchForm", () => {
    test("отображает форму поиска", () => {
        render(<SearchForm />);

        expect(screen.getByRole("searchbox")).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Поиск" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("combobox", { name: "Кол-во репозиториев" })
        ).toBeInTheDocument();
    });

    test("делает запрос к API после сабмита формы", async () => {
        // Мокаем успешный ответ от API
        const mockedResponse = {
            data: {
                items: [
                    { id: 1, name: "User 1" },
                    { id: 2, name: "User 2" },
                ],
            },
        };
        axios.get.mockResolvedValue(mockedResponse);

        render(<SearchForm />);

        const searchInput = screen.getByRole("searchbox");
        const searchButton = screen.getByRole("button", { name: "Поиск" });

        fireEvent.change(searchInput, { target: { value: "test" } });
        fireEvent.click(searchButton);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "users?q=test&per_page=20&page=1 ",
                { params: { sort: "repositories", order: "" } }
            );
            expect(screen.getByText("User 1")).toBeInTheDocument();
            expect(screen.getByText("User 2")).toBeInTheDocument();
        });
    });

    test("изменяет сортировку при выборе опции", async () => {
        // Мокаем успешный ответ от API
        const mockedResponse = {
            data: {
                items: [
                    { id: 1, name: "User 1" },
                    { id: 2, name: "User 2" },
                ],
            },
        };
        axios.get.mockResolvedValue(mockedResponse);

        render(<SearchForm />);

        const sortBySelect = screen.getByRole("combobox", {
            name: "Кол-во репозиториев",
        });

        fireEvent.change(sortBySelect, { target: { value: "asc" } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "users?q=&per_page=20&page=1&sort=repositories&order=asc"
            );
            expect(screen.getByText("User 1")).toBeInTheDocument();
            expect(screen.getByText("User 2")).toBeInTheDocument();
        });

        fireEvent.change(sortBySelect, { target: { value: "desc" } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "users?q=&per_page=20&page=1&sort=repositories&order=desc"
            );
            expect(screen.getByText("User 1")).toBeInTheDocument();
            expect(screen.getByText("User 2")).toBeInTheDocument();
        });
    });
});
