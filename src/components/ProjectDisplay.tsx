import React from "react";
import { IProject } from "../models/Project";
import 'dayjs/locale/en-gb';
import { Dayjs } from "dayjs";
import ProjectDisplayRow from "./ProjectDisplayRow.tsx";

interface ProjectDisplayProps {
        key: String,
        project: IProject,
        projects: IProject[],
        setProjects: React.Dispatch<React.SetStateAction<IProject[]>>
      }


const ProjectDisplay: React.FC<ProjectDisplayProps> = ({ project, projects, setProjects }) => {

        const projectPrivacy = (isPrivate: boolean) => {
                if (isPrivate==true){
                        return "Private";
                } else {
                        return "Public";
                }
        }
        
        const showDate = (date: Dayjs) => {
                if (date === null || date === undefined){
                        return "";
                }
                let displayDate = date.format('DD/MM/YYYY');
                if (displayDate=="Invalid Date"){
                        return "";
                } else {
                        return displayDate;
                }
        }

        const displayRows = () => {
                return (
                        <div key={project.key} className="border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                        <ProjectDisplayRow rowName="Name" data={project.name} key={project.key+"Name"} projects={projects} setProjects={setProjects}></ProjectDisplayRow>
                                        <ProjectDisplayRow rowName="Visibility" data={projectPrivacy(project.private)} key={project.key+"Visibility"} projects={projects} setProjects={setProjects}></ProjectDisplayRow>
                                        <ProjectDisplayRow rowName="Details" data={project.details} key={project.key+"Details"} projects={projects} setProjects={setProjects}></ProjectDisplayRow>
                                        <ProjectDisplayRow rowName="Start Date" data={showDate(project.startDate)} key={project.key+"Start Date"} projects={projects} setProjects={setProjects}></ProjectDisplayRow>
                                        <ProjectDisplayRow rowName="End Date" data={showDate(project.endDate)} key={project.key+"End Date"} projects={projects} setProjects={setProjects}></ProjectDisplayRow>
                                        <ProjectDisplayRow rowName="Assigned To" data={project.assignedTo} key={project.key+"Assigned To"} projectIdentifier={project.key} projects={projects} setProjects={setProjects}></ProjectDisplayRow>
                                        <ProjectDisplayRow rowName="Status" data={project.status} key={project.key+"Status"} projectIdentifier={project.key} projects={projects} setProjects={setProjects}></ProjectDisplayRow>
                                </dl>
                        </div>
                        )
        }

        return (
                <div key={project.key} className='border-2 border-black rounded pl-1'>
                        <div className="m-1 px-4 sm:px-0 flex content-center">
                                <h3 className="text-base/7 font-semibold text-gray-900 text-xl">Project</h3>
                        </div>
                        {displayRows()}
                </div>
        );
};

                        

export default ProjectDisplay;