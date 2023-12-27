import React from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "./Store/AuthContext";
// import { Toast } from "react-toastify/dist/components";
// import 'react-toastify/dist/react-toastify.css'
function Auth() {
  const {
    userRegister,
    userLogin,
    registerHandler,
    loginHandler,
    SubmitRegister,
    SubmitLogin,
    login,
    setLogin,
  } = useAuth();

  return (
    <>
      <section className={!login ? `${styles.wrapper}` : `${styles.wrapper} ${styles.active}`}>
        <div className={`${styles.form} ${styles.signup}`}>
          <header onClick={() => setLogin(false)}>Signup</header>
          <form className={styles.from} action="/" onSubmit={SubmitRegister}>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={userRegister.name}
              onChange={registerHandler}
            />
            <input
              type="text"
              name="email"
              placeholder="Email address"
              value={userRegister.email}
              onChange={registerHandler}
            />
            {/* <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={userRegister.phone}
              onChange={registerHandler}
            /> */}
            <input
              type="password"
              name="pass"
              placeholder="Password"
              value={userRegister.pass}
              onChange={registerHandler}
            />
            <input
              type="password"
              name="cpass"
              placeholder="Confirm Password"
              value={userRegister.cpass}
              onChange={registerHandler}
            />
            <div className={styles.checkbox}>
              <input type="checkbox" id="signupCheck" />
              <label htmlFor="signupCheck">
                I accept all terms & conditions
              </label>
            </div>
            <input type="submit" value="Signup" />
          </form>
        </div>

        <div className={`${styles.form} ${styles.login}`}>
          <header onClick={() => setLogin(true)}>Login</header>
          <form action="/" onSubmit={SubmitLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email address"
              value={userLogin.email}
              onChange={loginHandler}
            />
            <input
              type="password"
              name="pass"
              placeholder="Password"
              value={userLogin.pass}
              onChange={loginHandler}
            />
            <Link to="/">Forgot password?</Link>
            <input type="submit" value="Login" />
          </form>
        </div>
      </section>
    </>
  );
}

export default Auth;
