
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("preppilot-users")
      ) || []
    );
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("preppilot-current-user")
      ) || null
    );
  });

  // Save users
  useEffect(() => {
    localStorage.setItem(
      "preppilot-users",
      JSON.stringify(users)
    );
  }, [users]);

  // Save current user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "preppilot-current-user",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem(
        "preppilot-current-user"
      );
    }
  }, [currentUser]);

  // REGISTER
  const register = (name, email, password) => {
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "Email already registered.",
      };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    setUsers((prev) => [
      ...prev,
      newUser,
    ]);

    setCurrentUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });

    return {
      success: true,
    };
  };

  // LOGIN
  const login = (email, password) => {
    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
          email.toLowerCase() &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setCurrentUser({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      success: true,
    };
  };

  // LOGOUT
  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isLoggedIn: Boolean(currentUser),
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// IMPORTANT: useAuth must be exported
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
