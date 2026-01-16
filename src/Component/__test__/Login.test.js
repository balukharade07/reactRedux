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
import LoginForm from "../LoginForm";
import userEvent from "@testing-library/user-event";

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
const MockLoginComponent = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  </Provider>
);

const MockLoginFormComponent = () => (
  <Provider store={store}>
    <BrowserRouter>
      <LoginForm />
    </BrowserRouter>
  </Provider>
);

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    jest.setTimeout(100000);
    axios.get
      .mockResolvedValueOnce({ data: false }) // First API call
      .mockResolvedValueOnce({
        data: Promise.resolve(userList),
      })
      .mockResolvedValueOnce({
        data: Promise.resolve(usersQuotes),
      });
  });
  // test("renders login form correctly", async () => {
  //   await act(async () => await render(<MockLoginComponent />));

  //   expect(screen.getByText(/Forgot Password!/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Quotes/i)).toBeInTheDocument();
  // });

  // test("user list", async () => {
  //   await act(async () => await render(<MockLoginComponent />));

  //   await waitFor(() => {
  //     expect(axios.get).toHaveBeenNthCalledWith(
  //       2,
  //       "getRootURL('usersList')
  //     );
  //   });
  //   const quotesButton = screen.getByRole("button", { name: "Quotes" });
  //   expect(quotesButton).toBeInTheDocument();
  //   fireEvent.click(quotesButton);
  //   expect(screen.getByText(/All Quote's/i)).toBeInTheDocument();
  //   const quotesLogin = screen.getByRole("button", { name: "Login" });
  //   expect(quotesLogin).toBeInTheDocument();
  //   fireEvent.click(quotesLogin);
  //   expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  //   expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  //   expect(
  //     screen.getByRole("button", { name: /create user/i })
  //   ).toBeInTheDocument();
  //   fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  // });

  // test("displays validation errors when fields are empty", async () => {
  //   await act(async () => await render(<MockLoginComponent />));
  //   fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  //   expect(
  //     await screen.findByText("Please input your Email!")
  //   ).toBeInTheDocument();
  //   expect(
  //     await screen.findByText("Please input your password!")
  //   ).toBeInTheDocument();
  // });

  // test("resets fields when Reset button is clicked", async () => {
  //   await act(async () => await render(<MockLoginComponent />));
  //   const emailInput = screen.getByLabelText(/Email/i);
  //   const passwordInput = screen.getByLabelText(/Password/i);

  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });
  //   expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
  //   expect(screen.getByDisplayValue("password123")).toBeInTheDocument();

  //   const resetBtn = screen.getByRole("button", { name: /reset/i });
  //   expect(resetBtn).toBeInTheDocument();

  //   fireEvent.click(resetBtn);
  //   fireEvent.input(emailInput, { target: { value: "" } });
  //   fireEvent.input(passwordInput, { target: { value: "" } });
  //   expect(emailInput.value).toBe("");
  //   expect(passwordInput.value).toBe("");
  // });

  // test("forgot password button is clicked", async () => {
  //   await act(async () => await render(<MockLoginComponent />));

  //   const forgotPasswordBtn = screen.getByRole("button", {
  //     name: /Forgot Password!/i,
  //   });
  //   expect(forgotPasswordBtn).toBeInTheDocument();
  //   fireEvent.click(forgotPasswordBtn);
  //   const modalName = await screen.findByText(/Confirm Your Email/i);
  //   expect(modalName).toBeInTheDocument();
  //   const okBtn = screen.getByRole("button", {
  //     name: 'OK',
  //   });
  //   expect(okBtn).toBeInTheDocument();
  //   // fireEvent.click(okBtn);
  //   // expect(
  //   //   await screen.findByText("Please input your email!")
  //   // ).toBeInTheDocument();
  //   const cancelBtn = screen.getByRole("button", {
  //     name: /Cancel/i,
  //   });
  //   fireEvent.click(cancelBtn);
  //   expect(modalName).not.toBeInTheDocument();
  // });

  // test("create user button click", async () => {
  //   await act(async () => await render(<MockLoginComponent />));
  //   const createUserButton = screen.getByRole("button", {
  //     name: /Create User/i,
  //   });
  //   expect(createUserButton).toBeInTheDocument();
  //   console.log("✅ Found Create User button");

  //   fireEvent.click(createUserButton);
  //   console.log("🛠 Clicked Create User button");
  //   await act(async () => await render(<MockLoginFormComponent />));
    
  //   const okButton = await screen.findByTestId('add-user');
  //   expect(okButton).toBeInTheDocument();
  //   fireEvent.click(okButton);
    
  //   const loginForm = await screen.findByTestId('login-form');
  //   expect(loginForm).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(screen.getByText("Please input your username!")).toBeInTheDocument();
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByText("Please input your password!")).toBeInTheDocument();
  //   });
  //   await waitFor(() => {
  //     expect(screen.getByText("'email' is required")).toBeInTheDocument();
  //   });

  //   const resetButton = await screen.findByTestId('resetForm');
  //   expect(resetButton).toBeInTheDocument();
  //   fireEvent.click(resetButton);
    
  //   const loginButton = await screen.findByTestId('loginBtn');
  //   expect(loginButton).toBeInTheDocument();
  //   console.log("✅ Done");
  // });

  it("when user click quotes", async() => {
    jest.setTimeout(10000);
    const handleChange = jest.fn();
    await act(async () => await render(<MockLoginComponent />));
    const quotesBtn = screen.getByRole("button", {
      name: /quotes/i,
    });

    expect(quotesBtn).toBeInTheDocument();
    fireEvent.click(quotesBtn);
    const allQuote = await screen.findByText(/All Quote's/i);
    expect(allQuote).toBeInTheDocument();
    const quoteSelect = await screen.findByTestId('quote-select');
    expect(quoteSelect).toBeInTheDocument();
    // await userEvent.click(quoteSelect);
    // await waitFor(async () => {
    //   expect(screen.getByText('NewUser')).toBeInTheDocument();
    // });

    // userEvent.click(await screen.findByText('Balu Kharade'));
    // expect(handleChange).toHaveBeenCalledWith('Balu Kharade');

    
    expect(await screen.findByText(/Balu Kharade/i)).toBeInTheDocument();
  })
});
