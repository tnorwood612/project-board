import { Outlet, NavLink } from "react-router-dom";
import { useState } from 'react';
import { IProject } from '../models/Project';
import 'dayjs/locale/en-gb';
import dayjs, { Dayjs } from "dayjs";

export default function Header() {
        const activeStyle = 'm-1 rounded-md px-3 py-2 text-sm font-medium background-dark text-white';
        const inactiveStyle = 'm-1 rounded-md px-3 py-2 text-sm font-medium bg-gray-500 text-gray-900 hover:bg-gray-700 hover:text-white'
        const [projects, setProjects] = useState<IProject[]>([]);
        const [name, setName] = useState("");
        //these take Dayjs | null because that's what the datepicker provides
        const [date, setDate] = useState<Dayjs | null>(dayjs());
        const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
        const [details, setDetails] = useState("");
        const [status, setStatus] = useState("To Do");
        const [isHidden, setIsHidden] = useState(false);
        const [assignedTo, setAssignedTo] = useState("Developer");

        return (
                <>
                        <h1 className="text-center text-3xl">Project Board</h1>           
                        <nav className="px-3 py-2 text-sm font-medium">
                                <NavLink className={({ isActive }) => isActive ? activeStyle : inactiveStyle } to="/">Create Project</NavLink>
                                <NavLink className={({ isActive }) => isActive ? activeStyle : inactiveStyle } to="/display">View Projects</NavLink>
                        </nav>

                        <Outlet 
                                context={{projects: projects, setProjects: setProjects, name, setName, date, setDate, endDate, setEndDate, details, setDetails, status, setStatus, isHidden, setIsHidden, assignedTo, setAssignedTo}}
                        />
                </>
        );
}