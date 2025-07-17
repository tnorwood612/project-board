import 'dayjs/locale/en-gb';
import { IProject } from '../models/Project';
import { useOutletContext } from "react-router-dom";
import ProjectDisplay from "./ProjectDisplay.tsx";

export default function Display() {
        const {projects} = useOutletContext<{projects: IProject[]}>();
        const {setProjects} = useOutletContext<{setProjects:React.Dispatch<React.SetStateAction<IProject[]>>}>();
        
        const displayProjects = () => {
                if (projects.length !== 0){
                        return projects.map((project) => {
                                return (
                                        <div key={project.key}>
                                                <ProjectDisplay key={project.key} project={project} projects={projects} setProjects={setProjects}/>
                                                <br/>
                                        </div>
                                )})
                } else {
                        return (
                                <div>
                                        No projects added yet.<br></br>
                                        Head to Create Project to add your first project.
                                </div>
                        )

                }
        }

        return (
                <>
                        <h2 className="text-center text-2xl">View Projects</h2>
                        <div className='flex flex-col-reverse mt-10'>
                                        {displayProjects()}
                        </div> 
                </>
        );
}