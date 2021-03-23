import React from "react";
import "./App.css";
import api, { User } from "../../services/api";
import { Login } from "../Login/Login";
import { Logout } from "../Logout/Logout";
import { UserFeed } from "../Feed/Feed";

type AppProps = {};
type AppState = { user: User | null };

class App extends React.Component<AppProps, AppState> {
  state: AppState = { user: null };

  async componentDidMount() {
    const currentUser = await api.getCurrentUser();
    this.setState({ user: currentUser });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Coopflix</h1>
          <p>Don't do homework | Watch Coopflix instead</p>
        </header>
        {user === null ? (
          <Login onLoggedIn={user => this.setState({ user })} />
        ) : (
          <div>
            <span>Hello {user.name}</span>
            <Logout onLoggedOut={() => this.setState({ user: null })} />
            <UserFeed />
          </div>
        )}
      </div>
    );
  }
}

export default App;
