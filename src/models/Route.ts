import uuidv4 from "uuid/v4";
import ArrivalTimeSet from "./ArrivalTimeSet";
import ArrivalTime from "./ArrivalTime";

interface Props {
    id: string,
    busNumber: string,
    busStop: string,
    smsTextCode: string,
    lastUpdated: Date,
    arrivalTimeSets: Array<ArrivalTimeSet>
};

class Route {
    id: string;
    busNumber: string;
    busStop: string;
    smsTextCode: string;
    lastUpdated: Date;
    arrivalTimeSets: Array<ArrivalTimeSet>;

    constructor({id, busNumber, busStop, smsTextCode, lastUpdated, arrivalTimeSets}: Props = {}) {
        this.id = id || uuidv4();
        this.busNumber = busNumber || "";
        this.busStop = busStop || "";
        this.smsTextCode = smsTextCode || "";
        this.lastUpdated = lastUpdated || new Date();
        this.arrivalTimeSets = arrivalTimeSets || [];
    }

    get latestArrivalTimes(): ?Array<ArrivalTime> {
        const length = this.arrivalTimeSets.length;
        return (length === 0) ? [] : this.arrivalTimeSets[length - 1].arrivalTimes;
    }

    get latestArrivalMessage(): string {
        const length = this.arrivalTimeSets.length;
        return (length === 0) ? "" : this.arrivalTimeSets[length - 1].message;
    }

    get busNumberInt() {
        return parseInt(this.busNumber.split(" ")[0]);
    }
}

export default Route;
