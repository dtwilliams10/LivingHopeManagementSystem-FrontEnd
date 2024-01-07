import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { router } from "../router/Routes";
import { store } from "./store";

export default class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isLoggedIn() {
    return !!this.user;
  }

  getCurrentUser = () => {
    if (this.user) return this.user;
    return null;
  };

  setCurrentUser = (user: User) => {
    if (user) this.user = user;
  };

  login = async (creds: UserFormValues) => {
    try {
      const user: User = await agent.Accounts.login(creds);
      store.commonStore.setToken(user.jwtToken);
      runInAction(
        () =>
          (this.user = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            created: user.created,
            updated: user.updated,
            isVerified: user.isVerified,
            jwtToken: user.jwtToken,
            refreshToken: user.refreshToken,
          })
      );

      if (this.user) {
        this.setCurrentUser(this.user!);
      }

      console.log(this.user);
      router.navigate("/home");
    } catch (error) {
      throw error;
    }
  };

  logoff = async () => {
    localStorage.clear();
    router.navigate("/");
  };

  register = async (creds: UserFormValues) => {
    try {
      //creds.password - Need to salt and hash the password here before it's sumbitted.
      const user = await agent.Accounts.register(creds);
      store.commonStore.setToken(user.jwtToken);
      runInAction(() => (this.user = user));
      router.navigate("/home");
    } catch (error) {
      throw error;
    }
  };

  verifyEmail = async (token: JSON) => {
    console.log(token);
    if (token !== null) {
      try {
        agent.Accounts.verify(token);
        //if (response) router.navigate("/");
      } catch (error) {
        throw error;
      }
    }
  };

  getUser = async () => {
    try {
      const user: User | null = this.getCurrentUser();
      if (!user) {
        // need API call to get the logged in user?
        console.log("User object is null");
      }
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
