import React from "react";
import { IProject } from "../models/Project";

interface RowProps {
        rowName: string;
        data: string;
        projectIdentifier?: string;
        projects: IProject[];
        setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
      }


const ProjectDisplayRow: React.FC<RowProps> = ({ rowName, data, projectIdentifier, projects, setProjects }) => {
        const markComplete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
                const button = event.target as HTMLButtonElement;
                const index = projects.findIndex(ourProject => ourProject.key === button.value);
                const projectsCopy = [...projects];
                projectsCopy[index].status = "Complete";
                setProjects(projectsCopy);
        }

        const displayButton = () => {
                return (
                                <div className="mt-1 text-sm/6 text-gray-700 sm:col-span-1 sm:mt-0 button-placement">
                                        <button 
                                        className={data==="Complete" ? "hidden" : "sm:col-span-1 sm:mt-0 rounded-md bg-gray-500 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 button-width"}
                                        disabled={data==="Complete"} value={projectIdentifier} onClick={e => markComplete(e)}>Mark Complete
                                        </button>
                                </div>
                        )
        }
        return (
                <div className={rowName==="Status" ? "px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 justify-center table-row" : "px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 justify-center"}>
                        <div className="ml-1 text-sm/6 font-medium text-gray-900">{rowName}</div>
                        <div className="text-sm/6 text-gray-700 sm:col-span-1 sm:mt-0 break-word">{data}</div>
                        {rowName==="Status" ? displayButton() : ""}
                </div>
        );
};

export default ProjectDisplayRow;