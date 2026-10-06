import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError(
        "Password must contain at least 6 characters."
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register(
      form.name,
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

          <div className="col-md-7 col-lg-5 col-xl-4">

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
                Start your interview preparation
              </p>

            </div>

            <div className="card border-0 shadow-lg rounded-4">

              <div className="card-body p-4 p-md-5">

                <h4 className="fw-bold mb-1">
                  Create your account
                </h4>

                <p className="text-muted mb-4">
                  Start tracking your interview journey.
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
                      Full Name
                    </label>

                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-person text-primary"></i>
                      </span>

                      <input
                        type="text"
                        name="name"
                        className="form-control bg-light border-start-0"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

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

                  <div className="mb-3">
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
                        placeholder="Minimum 6 characters"
                        value={form.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Confirm Password
                    </label>

                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-shield-check text-primary"></i>
                      </span>

                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control bg-light border-start-0"
                        placeholder="Confirm your password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 rounded-3"
                  >
                    Create Account
                    <i className="bi bi-arrow-right ms-2"></i>
                  </button>

                </form>

                <div className="text-center mt-4">
                  <span className="text-muted">
                    Already have an account?
                  </span>{" "}
                  <Link
                    to="/login"
                    className="text-primary fw-semibold text-decoration-none"
                  >
                    Login
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

export default Register;
