import uuidv4 from "uuid/v4";
import ArrivalTime from "./ArrivalTime";

interface Props {
    id: string,
    message: string,
    createdDate: Date,
    arrivalTimes: Array<ArrivalTime>
};

class ArrivalTimeSet {
    id: string;
    message: string;
    createdDate: Date;
    arrivalTimes: Array<ArrivalTime>;

    static NO_TIMES_MESSAGE = "No upcoming arrival times";

    constructor({id, message, createdDate, arrivalTimes}: Props = {}) {
        this.id = id || uuidv4();
        this.message = message || "";
        this.createdDate = createdDate || new Date();
        this.arrivalTimes = arrivalTimes || [];
    }
}

export default ArrivalTimeSet;
