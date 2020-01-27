import uuidv4 from "uuid/v4";
import ArrivalTimeSet from "./ArrivalTimeSet";
import ArrivalTime from "./ArrivalTime";

class Route {
    id: string;
    arrivalTimeSetIds: Array<string>;
    busNumber: string;
    busStop: string;
    smsTextCode: string;
    lastUpdated: Date;
    arrivalTimeSets: Array<ArrivalTimeSet>;

    constructor({
        id = "",
        arrivalTimeSetIds = [],
        busNumber = "",
        busStop = "",
        smsTextCode = "",
        lastUpdated = new Date(),
        arrivalTimeSets = []
    }: Route) {
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

    getBusNumberInt(): number {
        return parseInt(this.busNumber.split(" ")[0]);
    }

    mergeWithArrivalTimeSets(arrivalTimeSetsById: {[id: string]: ArrivalTimeSet}): void {
        this.arrivalTimeSets = this.arrivalTimeSetIds.reduce((acc: Array<ArrivalTimeSet>, id) => (
            (id in arrivalTimeSetsById) ? [...acc, new ArrivalTimeSet(arrivalTimeSetsById[id])] : acc
        ), []);
    }

    static populateRoute(arrivalTimeSetsById: {[id: string]: ArrivalTimeSet}) {
        return (routeData: Route) => {
            const route = new Route(routeData);
            route.mergeWithArrivalTimeSets(arrivalTimeSetsById);

            return route;
        }
    }
}

export default Route;
