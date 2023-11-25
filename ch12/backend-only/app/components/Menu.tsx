import type { PropsWithChildren } from "react";
import { FormMenuItem } from "./FormMenuItem";
import { MenuItem } from "./MenuItem";

import styles from "./menu.module.css";

function Menu({ children }: PropsWithChildren) {
  return (
    <nav className={styles.nav}>
      <ul
        data-foo={`foo ${Object.keys(styles).join(",")}`}
        className={styles.navList}
      >
        {children}
      </ul>
    </nav>
  );
}

type MenuProps = PropsWithChildren<{ current?: String }>;

export function AuthMenu({ current = "", children }: MenuProps) {
  return (
    <>
      <Menu>
        <MenuItem to="/" isCurrent={current === ""}>
          Dashboard
        </MenuItem>
        <MenuItem to="/income" isCurrent={current === "income"}>
          Income
        </MenuItem>
        <MenuItem to="/expenses" isCurrent={current === "expenses"}>
          Expenses
        </MenuItem>
        <FormMenuItem to="/logout">Log out</FormMenuItem>
      </Menu>
      {children}
    </>
  );
}

export function UnauthMenu({ current = "", children }: MenuProps) {
  return (
    <>
      <Menu>
        <MenuItem to="/" isCurrent={current === ""}>
          Welcome
        </MenuItem>
        <MenuItem to="/login" isCurrent={current === "login"}>
          Login
        </MenuItem>
        <MenuItem to="/join" isCurrent={current === "join"}>
          Signup
        </MenuItem>
      </Menu>
      {children}
    </>
  );
}
