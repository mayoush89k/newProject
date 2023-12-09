import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import LoginPage from "./Components/LoginPage/LoginPage";
import VotePage from "./Components/VotePage/VotePage";
import AdminPage from "./Components/AdminPage/AdminPage";
import Header from "./Components/Header/Header";
import Chart from "./Components/Chart/Chart";
import { CharactersProvider } from "./context/CharactersContext";
import { UserProvider } from "./context/UserContext";

function App() {
  const [pageHolder, setPageHolder] = useState("Login");

  return (
    <div className="App">
      <ThemeProvider>
        <UserProvider>
          <Header setPageHolder={setPageHolder} />
          {pageHolder == "Login" && (
            <LoginPage
              setPageHolder={setPageHolder}
            />
          )}
          <CharactersProvider>
            {pageHolder == "Vote" && <VotePage />}
            {pageHolder == "Chart" && <Chart />}
            {pageHolder == "Admin" && <AdminPage />}
          </CharactersProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
