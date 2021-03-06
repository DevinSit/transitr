import uuidv4 from "uuid/v4";
import ArrivalTime from "./ArrivalTime";

// Declare the same class props on a separate Constructor interface
// so that all attributes are optional when constructing an instance.
interface Constructor {
    id?: string;
    routeId?: string;
    arrivalTimeIds?: Array<string>;
    message?: string;
    created?: Date;
    arrivalTimes?: Array<ArrivalTime>;
}

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
    }: Constructor = {}) {
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
        };
    }

    static createFromRawTimes(times: Array<string>): ArrivalTimeSet {
        const arrivalTimeSet = new ArrivalTimeSet();

        if (times.length === 0) {
            arrivalTimeSet.message = ArrivalTimeSet.NO_TIMES_MESSAGE;
        } else {
            const arrivalTimes = times.map((time) => {
                const arrivingSoon = time.charAt(time.length - 1) === "*";
                const parsedTime = arrivingSoon ? time.slice(0, -1) : time;

                return new ArrivalTime({
                    time: parsedTime,
                    arrivingSoon,
                    arrivalTimeSetId: arrivalTimeSet.id
                });
            });

            arrivalTimeSet.arrivalTimes = arrivalTimes;
            arrivalTimeSet.arrivalTimeIds = arrivalTimes.map((arrivalTime: ArrivalTime) => arrivalTime.id);
        }

        return arrivalTimeSet;
    }
}

export default ArrivalTimeSet;
