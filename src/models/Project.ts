import { Dayjs } from "dayjs";

export interface IProject {
        key: string;
        name: string;
        details: string;
        startDate: Dayjs;
        endDate: Dayjs;
        private: boolean;
        status: string;
        assignedTo: string;
}
