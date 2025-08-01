import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { cadastro } from "../data/data";

function Login() {
  const [hidePB, setHidePB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setHidePB(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bgmainclr d-flex justify-content-center align-items-center min-vh-100">
      <div
        id="login-box"
        className={`bg-light p-5  rounded-4 shadow ${hidePB ? "hidden" : ""}`}
      >
        <h2 className="text-center txtmainclr mt-5 py-5 mb-4">
          {cadastro.title2}
        </h2>
        <form className="mt-3 ">
          <div className="input-group bg-secondary-subtle rounded mb-3 p-2 align-items-center">
            <span className="me-2 text-success">
              <i className="fas fa-envelope"></i>
            </span>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.9168 6.25002C22.9168 5.10419 21.9793 4.16669 20.8335 4.16669H4.16683C3.021 4.16669 2.0835 5.10419 2.0835 6.25002M22.9168 6.25002V18.75C22.9168 19.8959 21.9793 20.8334 20.8335 20.8334H4.16683C3.021 20.8334 2.0835 19.8959 2.0835 18.75V6.25002M22.9168 6.25002L12.5002 13.5417L2.0835 6.25002"
                stroke="#757575"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <input
              type="email"
              className="form-control mx-2 border-0 bg-transparent"
              placeholder="E-mail"
              required
            />
          </div>

          <div className="input-group bg-secondary-subtle rounded mb-3 p-2 align-items-center">
            <span className="me-2 text-success">
              <i className="fas fa-lock"></i>
            </span>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.29167 11.4583V7.29165C7.29167 5.91031 7.8404 4.58555 8.81715 3.6088C9.7939 2.63205 11.1187 2.08331 12.5 2.08331C13.8813 2.08331 15.2061 2.63205 16.1828 3.6088C17.1596 4.58555 17.7083 5.91031 17.7083 7.29165V11.4583M5.20833 11.4583H19.7917C20.9423 11.4583 21.875 12.3911 21.875 13.5416V20.8333C21.875 21.9839 20.9423 22.9166 19.7917 22.9166H5.20833C4.05774 22.9166 3.125 21.9839 3.125 20.8333V13.5416C3.125 12.3911 4.05774 11.4583 5.20833 11.4583Z"
                stroke="#757575"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <input
              type="password"
              className="form-control mx-2 border-0 bg-transparent"
              placeholder="Senha"
              required
            />
          </div>

          <button type="submit" className="btn-login w-100 py-2 rounded-3 mb-2">
            {cadastro.btn3}
          </button>

          <Link
            to="#"
            className="d-block text-center txtmainclr small text-decoration-none"
          >
            {cadastro.desc3}
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
