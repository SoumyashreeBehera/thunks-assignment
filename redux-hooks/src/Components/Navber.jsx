import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Links = [
  {
    id: 1,
    to: "/",
    title: "Home",
  },
  {
    id: 2,
    to: "/completed",
    title: "Completed Todos",
  },
  {
    id: 3,
    to: "/more",
    title: "More",
  },
];

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.title}>
        <h2>Todos</h2>
      </div>
      <div className={styles.linkBox}>
        {Links.map(({ to, title, id }) => (
          <Link className={styles.links} key={id} to={to}>
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
}
