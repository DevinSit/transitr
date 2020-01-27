import uuidv4 from "uuid/v4";
import ArrivalTime from "./ArrivalTime";

class ArrivalTimeSet {
    id: string;
    routeId: string;
    arrivalTimeIds: Array<string>;
    message: string;
    created: Date;
    arrivalTimes: Array<ArrivalTime>;

    static NO_TIMES_MESSAGE = "No upcoming arrival times";

    constructor({
        id = uuidv4(),
        routeId = "",
        arrivalTimeIds = [],
        message = "",
        created = new Date(),
        arrivalTimes = []
    }: ArrivalTimeSet) {
        this.id = id;
        this.routeId = routeId;
        this.arrivalTimeIds = arrivalTimeIds;

        this.message = message;
        this.created = created;

        // Derived properties
        this.arrivalTimes = arrivalTimes;
    }

    mergeWithArrivalTimes(arrivalTimesById: {[id: string]: ArrivalTime}): void {
        this.arrivalTimes = this.arrivalTimeIds.reduce((acc: Array<ArrivalTime>, id: string) => (
            (id in arrivalTimesById) ? [...acc, new ArrivalTime(arrivalTimesById[id])] : acc
        ), []);
    }

    static populateArrivalTimeSet(arrivalTimesById: {[id: string]: ArrivalTime}) {
        return (arrivalTimeSetData: ArrivalTimeSet) => {
            const arrivalTimeSet = new ArrivalTimeSet(arrivalTimeSetData);
            arrivalTimeSet.mergeWithArrivalTimes(arrivalTimesById);

            return arrivalTimeSet;
        }
    }
}

export default ArrivalTimeSet;
