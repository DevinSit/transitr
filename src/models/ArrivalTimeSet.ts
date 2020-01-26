import uuidv4 from "uuid/v4";
import ArrivalTime from "./ArrivalTime";

interface Props {
    id: string,
    routeId: string,
    arrivalTimeIds: Array<string>,
    message: string,
    created: Date,
    arrivalTimes: Array<ArrivalTime>
};

class ArrivalTimeSet {
    id: string;
    routeId: string;
    arrivalTimeIds: Array<string>;
    message: string;
    created: Date;
    arrivalTimes: Array<ArrivalTime>;

    static NO_TIMES_MESSAGE = "No upcoming arrival times";

    constructor({id, routeId, arrivalTimeIds, message, created, arrivalTimes}: Props = {}) {
        this.id = id || uuidv4();
        this.routeId = routeId;
        this.arrivalTimeIds = arrivalTimeIds || [];

        this.message = message || "";
        this.created = created || new Date();

        // Derived properties
        this.arrivalTimes = arrivalTimes || [];
    }

    mergeWithArrivalTimes(arrivalTimesById) {
        this.arrivalTimes = this.arrivalTimeIds.reduce((acc, id) => (
            (id in arrivalTimesById) ? [...acc, new ArrivalTime(arrivalTimesById[id])] : acc
        ), []);
    }

    static populateArrivalTimeSet(arrivalTimesById) {
        return (arrivalTimeSetData) => {
            if (arrivalTimeSetData) {
                const arrivalTimeSet = new ArrivalTimeSet(arrivalTimeSetData);
                arrivalTimeSet.mergeWithArrivalTimes(arrivalTimesById);

                return arrivalTimeSet;
            } else {
                return null;
            }
        }
    }
}

export default ArrivalTimeSet;
