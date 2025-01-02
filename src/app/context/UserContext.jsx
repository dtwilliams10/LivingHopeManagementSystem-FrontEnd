import { createContext, useState } from "react";
import agent from "../api/agent";

const UserContext = createContext();

export const UserContextProvider = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const login = async (creds) => {
    try {
      const user = await agent.Accounts.login(creds);
      setToken(user.jwtToken);
      localStorage.setItem("jwt", user.jwtToken);
      if (user) {
        setUser(user);
      }

      console.log(user);
      router.navigate("/home");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logoff = async () => {
    localStorage.clear();
    setUser({});
    router.navigate("/");
  };

  const register = async (creds) => {
    //creds.password - Need to salt and hash the password here before it's sumbitted.
    const user = await agent.Accounts.register(creds);
    setToken(user.jwtToken);
    router.navigate("/home");
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      login,
      logoff,
      register,
    }),
    []
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContext;
