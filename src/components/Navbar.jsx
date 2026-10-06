
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStudy } from "../context/StudyContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { performance } = useStudy();

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const accuracy = performance.length
    ? Math.round(
        performance.reduce(
          (sum, item) => sum + (item.score || 0),
          0
        ) / performance.length
      )
    : 0;

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "bi-grid-1x2-fill",
    },
    {
      name: "Topics",
      path: "/topics",
      icon: "bi-journal-code",
    },
    {
      name: "Practice",
      path: "/practice",
      icon: "bi-lightning-charge-fill",
    },
    {
      name: "Interview",
      path: "/interview",
      icon: "bi-mic-fill",
    },
    {
      name: "Progress",
      path: "/progress",
      icon: "bi-bar-chart-fill",
    },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <nav
        className="sticky-top bg-white"
        style={{
          borderBottom: "1px solid #e9ecef",
          zIndex: 1050,
        }}
      >
        <div className="container-fluid px-3 px-lg-4">

          <div
            className="d-flex align-items-center justify-content-between"
            style={{ minHeight: "72px" }}
          >

            {/* ================= LOGO ================= */}

            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="text-decoration-none d-flex align-items-center gap-2 flex-shrink-0"
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-3 shadow-sm"
                style={{
                  width: "42px",
                  height: "42px",
                  background:
                    "linear-gradient(135deg,#2563eb,#7c3aed)",
                }}
              >
                <i className="bi bi-stars text-white fs-5"></i>
              </div>

              <div>
                <div
                  className="fw-bold text-dark"
                  style={{
                    fontSize: "1.25rem",
                    lineHeight: 1,
                  }}
                >
                  Prep
                  <span className="text-primary">
                    Pilot
                  </span>
                </div>

                <small
                  className="text-muted d-none d-md-block"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "1px",
                  }}
                >
                  SMART INTERVIEW PREP
                </small>
              </div>
            </Link>

            {/* ================= DESKTOP NAV ================= */}

            <div className="d-none d-lg-flex align-items-center gap-1 mx-3">

              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-decoration-none d-flex align-items-center gap-2 px-3 py-2 rounded-3 ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-secondary"
                    }`
                  }
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    transition: "all 0.2s ease",
                  }}
                >
                  <i
                    className={`bi ${item.icon}`}
                  ></i>

                  {item.name}
                </NavLink>
              ))}

            </div>

            {/* ================= RIGHT SIDE ================= */}

            <div className="d-flex align-items-center gap-3">

              {/* ACCURACY */}

              <div className="d-none d-xl-flex align-items-center gap-2">

                <div
                  className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center"
                  style={{
                    width: "38px",
                    height: "38px",
                  }}
                >
                  <i className="bi bi-bullseye"></i>
                </div>

                <div>
                  <small
                    className="text-muted d-block"
                    style={{ fontSize: "11px" }}
                  >
                    Accuracy
                  </small>

                  <strong style={{ fontSize: "14px" }}>
                    {accuracy}%
                  </strong>
                </div>

              </div>

              {/* ================= DESKTOP PROFILE ================= */}

              <div className="d-none d-sm-block position-relative">

                <button
                  type="button"
                  className="btn border-0 d-flex align-items-center gap-2 px-2 py-1 rounded-pill"
                  style={{
                    background: "#f8f9fa",
                  }}
                  onClick={() =>
                    setProfileOpen((prev) => !prev)
                  }
                >

                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{
                      width: "36px",
                      height: "36px",
                      background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                    }}
                  >
                    {currentUser?.name
                      ?.charAt(0)
                      .toUpperCase() || "P"}
                  </div>

                  <span className="fw-semibold small">
                    {currentUser?.name || "Learner"}
                  </span>

                  <i
                    className={`bi ${
                      profileOpen
                        ? "bi-chevron-up"
                        : "bi-chevron-down"
                    } small text-muted`}
                  ></i>

                </button>

                {/* PROFILE DROPDOWN */}

                {profileOpen && (
                  <div
                    className="position-absolute end-0 mt-2 bg-white rounded-4 shadow-lg border p-2"
                    style={{
                      width: "250px",
                      zIndex: 1100,
                    }}
                  >

                    <div className="px-3 py-2">

                      <small className="text-muted">
                        Signed in as
                      </small>

                      <div className="fw-bold mt-1">
                        {currentUser?.name}
                      </div>

                      <small className="text-muted">
                        {currentUser?.email}
                      </small>

                    </div>

                    <hr className="my-2" />

                    <Link
                      to="/progress"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="dropdown-item rounded-3 py-2"
                    >
                      <i className="bi bi-bar-chart me-2 text-primary"></i>
                      My Progress
                    </Link>

                    <Link
                      to="/interview"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="dropdown-item rounded-3 py-2"
                    >
                      <i className="bi bi-mic me-2 text-primary"></i>
                      Mock Interview
                    </Link>

                    <button
                      type="button"
                      className="dropdown-item rounded-3 py-2 text-danger"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>

                  </div>
                )}

              </div>

              {/* ================= MOBILE BUTTON ================= */}

              <button
                type="button"
                className="btn btn-light border rounded-3 d-lg-none"
                onClick={() =>
                  setMenuOpen((prev) => !prev)
                }
                aria-label="Toggle navigation"
              >
                <i
                  className={`bi ${
                    menuOpen
                      ? "bi-x-lg"
                      : "bi-list"
                  } fs-4`}
                ></i>
              </button>

            </div>

          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}

        {menuOpen && (
          <div
            className="d-lg-none bg-white border-top shadow-sm"
            style={{
              animation:
                "slideDown 0.2s ease",
            }}
          >
            <div className="container-fluid p-3">

              {/* USER INFO */}

              <div
                className="p-3 rounded-4 mb-3"
                style={{
                  background:
                    "linear-gradient(135deg,#eef4ff,#f5f0ff)",
                }}
              >

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{
                      width: "45px",
                      height: "45px",
                      background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                    }}
                  >
                    {currentUser?.name
                      ?.charAt(0)
                      .toUpperCase() || "P"}
                  </div>

                  <div>

                    <div className="fw-bold">
                      {currentUser?.name || "Learner"}
                    </div>

                    <small className="text-muted">
                      {currentUser?.email}
                    </small>

                  </div>

                </div>

              </div>

              {/* NAVIGATION */}

              <div className="mb-3">
                <small className="text-muted fw-bold">
                  NAVIGATION
                </small>
              </div>

              <div className="d-flex flex-column gap-2">

                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `text-decoration-none d-flex align-items-center gap-3 px-3 py-3 rounded-3 ${
                        isActive
                          ? "bg-primary text-white"
                          : "bg-light text-dark"
                      }`
                    }
                  >
                    <i
                      className={`bi ${item.icon} fs-5`}
                    ></i>

                    <span className="fw-semibold">
                      {item.name}
                    </span>

                    <i className="bi bi-chevron-right ms-auto"></i>
                  </NavLink>
                ))}

              </div>

              {/* MOBILE ACCURACY */}

              <div className="mt-3 p-3 bg-light rounded-4">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="rounded-circle bg-success-subtle text-success d-flex align-items-center justify-content-center"
                    style={{
                      width: "45px",
                      height: "45px",
                    }}
                  >
                    <i className="bi bi-bullseye fs-5"></i>
                  </div>

                  <div>

                    <small className="text-muted">
                      Overall Accuracy
                    </small>

                    <h5 className="fw-bold mb-0">
                      {accuracy}%
                    </h5>

                  </div>

                </div>

              </div>

              {/* MOBILE LOGOUT */}

              <button
                type="button"
                className="btn btn-outline-danger w-100 mt-3 py-2 rounded-3"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i>
                Logout
              </button>

            </div>
          </div>
        )}
      </nav>

      {/* ================= CSS ================= */}

      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (min-width: 992px) {
            nav a:not(.bg-primary):hover {
              background: #f1f5f9;
              color: #2563eb !important;
              transform: translateY(-1px);
            }
          }

          .dropdown-item {
            transition: all 0.15s ease;
          }

          .dropdown-item:hover {
            background: #f1f5f9;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
