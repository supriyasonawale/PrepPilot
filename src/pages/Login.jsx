import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    const result = login(
      form.email,
      form.password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background:
          "linear-gradient(135deg,#eef4ff,#f8f5ff)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-6 col-lg-5 col-xl-4">

            <div className="text-center mb-4">

              <Link
                to="/login"
                className="text-decoration-none"
              >
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-4 shadow-sm"
                  style={{
                    width: "55px",
                    height: "55px",
                    background:
                      "linear-gradient(135deg,#2563eb,#7c3aed)",
                  }}
                >
                  <i className="bi bi-stars text-white fs-4"></i>
                </div>

                <h3 className="fw-bold text-dark mt-3 mb-1">
                  Prep<span className="text-primary">
                    Pilot
                  </span>
                </h3>
              </Link>

              <p className="text-muted">
                Smart interview preparation
              </p>

            </div>

            <div className="card border-0 shadow-lg rounded-4">

              <div className="card-body p-4 p-md-5">

                <h4 className="fw-bold mb-1">
                  Welcome back
                </h4>

                <p className="text-muted mb-4">
                  Login to continue your preparation.
                </p>

                {error && (
                  <div className="alert alert-danger border-0 rounded-3">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email
                    </label>

                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-envelope text-primary"></i>
                      </span>

                      <input
                        type="email"
                        name="email"
                        className="form-control bg-light border-start-0"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock text-primary"></i>
                      </span>

                      <input
                        type="password"
                        name="password"
                        className="form-control bg-light border-start-0"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 rounded-3"
                  >
                    Login
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>

                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Don't have an account?
                  </span>{" "}
                  <Link
                    to="/register"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Create account
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;