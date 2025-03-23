import React, { act } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "../Login";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../../Reducer";
import { userList, usersQuotes } from "./mockData";

const store = configureStore({ reducer: rootReducer });

// Mock dependencies
jest.mock("axios");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock implementations
const mockNavigate = jest.fn();

useSelector.mockImplementation(() => ({ user: { name: "Test User" } }));
useDispatch.mockImplementation(() => jest.fn());
useNavigate.mockReturnValue(mockNavigate);

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.setTimeout(15000);
  });

  test("renders login form correctly", async () => {
    axios.get.mockResolvedValue({ data: Promise.resolve({ data: false }) });

    await act(async () => {
        return await render(
          <Provider store={store}>
            <BrowserRouter>
              <Login />
            </BrowserRouter>
          </Provider>
        );
      });

    expect(screen.getByText(/Forgot Password!/i)).toBeInTheDocument();
    expect(screen.getByText(/Quotes/i)).toBeInTheDocument();
  });

  test("user list", async () => {
    axios.get
      .mockResolvedValueOnce({ data: false }) // First API call
      .mockResolvedValueOnce({
        data: Promise.resolve(userList),
      }).mockResolvedValueOnce({
        data: Promise.resolve(usersQuotes),
      })
    await act(async () => {
      return await render(
        <Provider store={store}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>
      );
    });

    await waitFor(() => {
        expect(axios.get).toHaveBeenNthCalledWith(2, "http://localhost:5000/usersList");
      });
    const quotesButton = screen.getByRole('button', {name: 'Quotes'});
    expect(quotesButton).toBeInTheDocument();
    fireEvent.click(quotesButton);
    expect(screen.getByText(/All Quote's/i)).toBeInTheDocument();
    const quotesLogin = screen.getByRole('button', {name: 'Login'});
    expect(quotesLogin).toBeInTheDocument();
    fireEvent.click(quotesLogin);
    
  });
});
