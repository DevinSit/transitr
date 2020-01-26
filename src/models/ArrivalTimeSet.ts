import uuidv4 from "uuid/v4";
import ArrivalTime from "./ArrivalTime";

interface Props {
    id: string,
    routeId: string,
    message: string,
    created: Date,
    arrivalTimes: Array<ArrivalTime>
};

class ArrivalTimeSet {
    id: string;
    routeId: string;
    message: string;
    created: Date;
    arrivalTimes: Array<ArrivalTime>;

    static NO_TIMES_MESSAGE = "No upcoming arrival times";

    constructor({id, routeId, message, created, arrivalTimes}: Props = {}) {
        this.id = id || uuidv4();
        this.routeId = routeId;
        this.message = message || "";
        this.created = created || new Date();
        this.arrivalTimes = arrivalTimes || [];
    }
}

export default ArrivalTimeSet;
