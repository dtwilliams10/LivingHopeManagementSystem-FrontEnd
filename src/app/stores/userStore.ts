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
    return this.user;
  }

  login = async (creds: UserFormValues) => {
    try {
      const user = await agent.Accounts.login(creds);
      store.commonStore.setToken(user.jwtToken);
      runInAction(() => (this.user = user));
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
        await agent.Accounts.verify(token);
        //if (response) router.navigate("/");
      } catch (error) {
        throw error;
      }
    }
  };

  getUser = async () => {};
}
