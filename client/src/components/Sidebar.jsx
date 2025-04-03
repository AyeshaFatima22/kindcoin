import { NavLink } from "react-router-dom"
import { logo } from "../assets"
import { navlinks } from "../constants"
import Icon from "./Icon"
import ThemeModes from "./ThemeModes"

const Sidebar = () => {
  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh] select-none">
      <NavLink to="/">
        <Icon name="KindCoin" styles="w-[52px] h-[52px] bg-white dark:bg-slate-800 shadow-soft" imgUrl={logo} />
      </NavLink>

      <div className="flex-1 flex flex-col justify-between items-center bg-white dark:bg-slate-800 rounded-2xl w-[76px] py-4 mt-12 shadow-soft">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((Link) => (
            <NavLink key={Link.name} to={Link.route}>
              {({ isActive }) => <Icon {...Link} isActive={isActive} />}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center justify-center flex-col gap-1">
          <ThemeModes />
        </div>
      </div>
    </div>
  )
}

export default Sidebar

