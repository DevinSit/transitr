import uuidv4 from "uuid/v4";
import ArrivalTimeSet from "./ArrivalTimeSet";
import ArrivalTime from "./ArrivalTime";

interface Props {
    id: string,
    arrivalTimeSetIds: Array<string>,
    busNumber: string,
    busStop: string,
    smsTextCode: string,
    lastUpdated: Date,
    arrivalTimeSets: Array<ArrivalTimeSet>
};

class Route {
    id: string;
    arrivalTimeSetIds: Array<string>;
    busNumber: string;
    busStop: string;
    smsTextCode: string;
    lastUpdated: Date;
    arrivalTimeSets: Array<ArrivalTimeSet>;

    constructor({id, arrivalTimeSetIds, busNumber, busStop, smsTextCode, lastUpdated, arrivalTimeSets}: Props = {}) {
        this.id = id || uuidv4();
        this.arrivalTimeSetIds = arrivalTimeSetIds || [];

        this.busNumber = busNumber || "";
        this.busStop = busStop || "";
        this.smsTextCode = smsTextCode || "";
        this.lastUpdated = lastUpdated || new Date();

        // Derived properties
        this.arrivalTimeSets = arrivalTimeSets || [];
    }

    getLatestArrivalTimes(): Array<ArrivalTime> {
        const length = this.arrivalTimeSets.length;
        return (length === 0) ? [] : this.arrivalTimeSets[length - 1].arrivalTimes;
    }

    getLatestArrivalMessage(): string {
        const length = this.arrivalTimeSets.length;
        return (length === 0) ? "" : this.arrivalTimeSets[length - 1].message;
    }

    getBusNumberInt() {
        return parseInt(this.busNumber.split(" ")[0]);
    }

    mergeWithArrivalTimeSets(arrivalTimeSetsById) {
        this.arrivalTimeSets = this.arrivalTimeSetIds.reduce((acc, id) => (
            (id in arrivalTimeSetsById) ? [...acc, new ArrivalTimeSet(arrivalTimeSetsById[id])] : acc
        ), []);
    }

    static populateRoute(arrivalTimeSetsById) {
        return (routeData) => {
            if (routeData) {
                const route = new Route(routeData);
                route.mergeWithArrivalTimeSets(arrivalTimeSetsById);

                return route;
            } else {
                return null;
            }
        }
    }
}

export default Route;
