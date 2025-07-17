import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';
import dayjs, { Dayjs } from "dayjs";
import { IProject } from '../models/Project';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface FormProps {
        name: string,
        setName: React.Dispatch<React.SetStateAction<string>>,
        date: Dayjs,
        setDate: React.Dispatch<React.SetStateAction<Dayjs|null>>,
        endDate: Dayjs,
        setEndDate: React.Dispatch<React.SetStateAction<Dayjs|null>>,
        details: string,
        setDetails: React.Dispatch<React.SetStateAction<string>>,
        status: string,
        setStatus: React.Dispatch<React.SetStateAction<string>>,
        isHidden: boolean,
        setIsHidden: React.Dispatch<React.SetStateAction<boolean>>,
        assignedTo: string,
        setAssignedTo: React.Dispatch<React.SetStateAction<string>>,
      }

export default function Form({}) {
        const navigate = useNavigate();

        const {setProjects} = useOutletContext<{setProjects:React.Dispatch<React.SetStateAction<IProject[]>>}>();
        const {name, setName, date, setDate, endDate, setEndDate, details, setDetails, status, setStatus, isHidden, setIsHidden, assignedTo, setAssignedTo}: FormProps = useOutletContext();


        const handleIsHidden = (event: React.ChangeEvent<HTMLInputElement>) => {
                if (event.target.id==="hidden"){
                        setIsHidden(true);
                } else {
                        setIsHidden(false);
                }
        };

        const resetFormState = () => {
                setName("");
                setDate(dayjs());
                setEndDate(dayjs());
                setDetails("");
                setStatus("To Do");
                setIsHidden(false);
                setAssignedTo("Developer");
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                if (date===null || endDate===null || !validateDates(date, endDate)){
                        return;
                }
                const project: IProject = {
                        key: dayjs().unix() + "-" + name,
                        name: name,
                        details: details,
                        startDate: date,
                        endDate: endDate,
                        private: isHidden,
                        status: status,
                        assignedTo: assignedTo
                    };
                setProjects(projects => [...projects, project]);
                resetFormState();
                return navigate("/display");
        };

        const validateDates = (date: Dayjs, endDate: Dayjs) => {
                let warningString = "";
                let error = false;
                if (!validateDate(date)){
                        warningString += 'Please enter a valid start date.\n';
                        error = true;
                }
                if (!validateDate(endDate)){
                        warningString += 'Please enter a valid end date.';
                        error = true;
                }
                if(error){
                        alert(warningString);
                        return false;
                }
                return true;

        }
        
        const validateDate = (date: Dayjs) => {
                if (date.format("DD/MM/YYYY") === "Invalid Date"){
                        return false;
                }
                return true;
        }

        return (
                <>
                <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="space-y-12">
                                <div className="border-gray-900/10 pb-12">
                                        <h2 className="text-center text-2xl">Create Project</h2>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                                                <div className="col-span-3">
                                                        <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Project Name (required)</label>
                                                        <div className="mt-2">
                                                                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                                                        <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                                                                        <input type="text" name="name" id="name" defaultValue={name} required onChange={(e) => setName(e.target.value)} className="form-background block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="My Project"></input>
                                                                </div>
                                                        </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                        <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">Project Visibility</label>
                                                        <div className="grid grid-cols-1">                                                          
                                                                <label className="form--radio-label">
                                                                        <input
                                                                        type="radio"
                                                                        name="isHidden"
                                                                        value="false"
                                                                        id="notHidden"
                                                                        checked={isHidden === false}
                                                                        onChange={e => handleIsHidden(e)}
                                                                        />
                                                                        <span>Public</span>
                                                                </label>
                                                                <label className="form--radio-label">
                                                                        <input
                                                                        type="radio"
                                                                        name="isHidden"
                                                                        id="hidden"
                                                                        checked={isHidden === true}
                                                                        onChange={e => handleIsHidden(e)}
                                                                        />
                                                                        <span>Private</span>
                                                                </label>
                                                        </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                        <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">Project Details (required)</label>
                                                        <div className="mt-2">
                                                                <textarea name="about" id="about" rows={2} placeholder="Project details..." defaultValue={details} required onChange={(e) => setDetails(e.target.value)} className="form-background block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                                                        </div>
                                                </div>

                                                <div className="sm:col-span-3">
                                                        <label htmlFor="startDate" className="block text-sm/6 font-medium text-gray-900">Dates (required)</label>
                                                        <div className='mt-2'>
                                                                <span className="mr-1">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                                                                <DateField
                                                                                label="Start Date"
                                                                                name="startDate" id="startDate"
                                                                                defaultValue={date}
                                                                                required
                                                                                onChange={(newValue) => setDate(newValue)}
                                                                                className="form-background "
                                                                                />
                                                                        </LocalizationProvider>
                                                                </span>
                                                                <span className="">
                                                                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                                                                                <DateField
                                                                                label="End Date"
                                                                                name="endDate" id="endDate"
                                                                                defaultValue={endDate}
                                                                                required
                                                                                onChange={(newValue) => setEndDate(newValue)}
                                                                                className="form-background"
                                                                                />
                                                                        </LocalizationProvider>
                                                                </span>
                                                        </div>
                                                </div>

                                                <div className="sm:col-span-2">
                                                        <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">Project Status</label>
                                                        <div className="mt-2 grid grid-cols-1">
                                                                <select id="status" name="status" autoComplete="project-status" defaultValue={status} onChange={(e) => setStatus(e.target.value)} className="form-background col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                                                        <option>To Do</option>
                                                                        <option>In Progress</option>
                                                                        <option>Complete</option>
                                                                </select>
                                                                <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                                </svg>
                                                        </div>
                                                </div>
                                                <div className="sm:col-span-2">
                                                        <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">Assigned To</label>
                                                        <div className="mt-2 grid grid-cols-1">
                                                                <select id="assignedTo" name="assignedTo" autoComplete="assigned-to" defaultValue={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} className="form-background col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                                                        <option>Developer</option>
                                                                        <option>Manager</option>
                                                                </select>
                                                                <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                                        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                                </svg>
                                                        </div>
                                                </div>
                                                <div className="col-span-1">
                                                        <div className="mt-8 flex justify-left">
                                                                <button type="submit" className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </form>
                </>
        );
}