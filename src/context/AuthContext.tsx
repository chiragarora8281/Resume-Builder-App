import axios from "axios";
import React, { createContext, useReducer } from "react";
import authReducer, { AuthState } from "../reducer/AuthReducer";
import { PayloadProps } from "../types/PayloadType";
import { UsersStateType } from "../reducer/UserReducer";
import toast, { Toaster } from "react-hot-toast";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type SignInType = {
  email: string;
  password: string;
};

interface ContextValueType {
  authState: AuthState;
  signup: (payload: PayloadProps | null) => Promise<void>; // Return type added for consistency
  signIn: (payload: SignInType, users: UsersStateType) => boolean | PayloadProps;
}

export const UserContextApi = createContext<ContextValueType | null>(null);

const initialState: AuthState = {
  payload: null,
  isLoading: true,
};

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [auth, dispatch] = useReducer(authReducer, initialState);
  const signup = async (payload: PayloadProps | null): Promise<void> => {
    try {
      if (payload) {
        const { data } = await axios.post(
          "http://localhost:5000/users",
          payload
        );
        toast.success("successfully registered")
        dispatch({ type: "SIGNUP", payload: data });
      } else {
        console.error("Payload is null");
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
    }
  };

  const signIn = (payload: SignInType, userData: UsersStateType) => {
    const { email, password } = payload;
    const users = userData?.payload;

    if (!users) {
      toast.error("User Not found");
      return false;
    }

    const foundUser = users.find((user) => user.email === email);
    
    if (!foundUser) {
      toast.error("User with provided email does not exist");
      return false;
    }

    if (foundUser.password !== password) {
      toast.error("Incorrect password");
      return false;
    }

    toast.success("Successfully Logged In!");
    // Dispatch an action to update the authentication state upon successful login
    dispatch({ type: "LOGIN", payload: foundUser });
    return foundUser;
  };

  const contextValue: ContextValueType = {
    authState: auth,
    signup: signup,
    signIn: signIn,
  };

  return (
    <>
      <Toaster />
      <UserContextApi.Provider value={contextValue}>
        {children}
      </UserContextApi.Provider>
    </>
  );
};

export default UserContextProvider;