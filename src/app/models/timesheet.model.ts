import { Time } from "@angular/common"

export default class Timesheet {
    id? : string;
    type? : string;
    date? : string;
    startTime? : string;
    endTime? : string;
    description? : string;
    status? : string;
    email?: string;
}
