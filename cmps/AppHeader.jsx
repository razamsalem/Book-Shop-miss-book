import { UserMsg } from "./UserMsg.jsx"

const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {
  return (
    <header className="app-header">
      <section className="header-container">
        <h1 className="header"> Miss Book<img src="./assets/img/banner-header.png" alt="banner" /></h1>
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/book">Books</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  )
}
