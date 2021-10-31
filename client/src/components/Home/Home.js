import React, { useState, useEffect } from "react";

const Home = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [setUser]);

  return (
    <div>
      {user?.result ? (
        <div>
          <h1>Home page / Dashboard</h1>
          <p>
            Questa Pagina deve mostrare la dashboard se esiste un utente logged
            in, altrimenti ridireziona a "/" component Login
          </p>
        </div>
      ) : (
        <div>
          <h1>Some Mock Up Dashboard page</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
