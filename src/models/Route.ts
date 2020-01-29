import uuidv4 from "uuid/v4";
import ArrivalTimeSet from "./ArrivalTimeSet";
import ArrivalTime from "./ArrivalTime";

const LETTERS_ONLY = /^[a-zA-Z ']+$/;
const NUMBERS_ONLY = /^\d+$/;

// Declare the same class props on a separate Constructor interface
// so that all attributes are optional when constructing an instance.
interface Constructor {
    id?: string;
    arrivalTimeSetIds?: Array<string>;
    busNumber?: string;
    busStop?: string;
    smsTextCode?: string;
    lastUpdated?: Date;
    arrivalTimeSets?: Array<ArrivalTimeSet>;
}

export enum SortMethod {
    SORT_BUS_NUMBER = "Bus Number",
    SORT_BUS_STOP = "Bus Stop",
    SORT_LAST_UPDATED = "Last Updated"
}

class Route {
    id: string;
    arrivalTimeSetIds: Array<string>;
    busNumber: string;
    busStop: string;
    smsTextCode: string;
    lastUpdated: Date;
    arrivalTimeSets: Array<ArrivalTimeSet>;

    constructor({
        id = uuidv4(),
        arrivalTimeSetIds = [],
        busNumber = "",
        busStop = "",
        smsTextCode = "",
        lastUpdated = new Date(),
        arrivalTimeSets = []
    }: Constructor = {}) {
        this.id = id;
        this.arrivalTimeSetIds = arrivalTimeSetIds;

        this.busNumber = busNumber;
        this.busStop = busStop;
        this.smsTextCode = smsTextCode;
        this.lastUpdated = lastUpdated;

        // Derived properties
        this.arrivalTimeSets = arrivalTimeSets;
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

    static parseTextCode(smsTextCode: string = ""): {busNumber: string, busStop: string} {
        const splitCode = smsTextCode.trim().replace(/\s\s+/g, " ").split(" ");

        let busStop = "";
        let busNumber = "";

        if (splitCode.length === 1) {
            busStop = splitCode[0];
        } else if (splitCode.length === 2) {
            const firstSplit = splitCode[0];
            const secondSplit = splitCode[1];

            if (
                (LETTERS_ONLY.test(firstSplit) && NUMBERS_ONLY.test(secondSplit)) ||
                (NUMBERS_ONLY.test(firstSplit) && NUMBERS_ONLY.test(secondSplit))
            ) {
                busNumber = secondSplit;
                busStop = firstSplit;
            } else if (LETTERS_ONLY.test(firstSplit) && LETTERS_ONLY.test(secondSplit)) {
                busStop = firstSplit + " " + secondSplit;
            }
        } else if (splitCode.length === 3) {
            const firstSplit = splitCode[0];
            const secondSplit = splitCode[1];
            const thirdSplit = splitCode[2];

            if (
                LETTERS_ONLY.test(firstSplit) && NUMBERS_ONLY.test(secondSplit) && NUMBERS_ONLY.test(thirdSplit) ||
                NUMBERS_ONLY.test(firstSplit) && NUMBERS_ONLY.test(secondSplit) && NUMBERS_ONLY.test(thirdSplit)
            ) {
                busNumber = secondSplit + " " + thirdSplit;
                busStop = firstSplit;
            } else if (LETTERS_ONLY.test(firstSplit) && LETTERS_ONLY.test(secondSplit) && NUMBERS_ONLY.test(thirdSplit)) {
                busNumber = thirdSplit;
                busStop = firstSplit + " " + secondSplit;
            }
        } else if (splitCode.length === 4) {
            const firstSplit = splitCode[0];
            const secondSplit = splitCode[1];
            const thirdSplit = splitCode[2];
            const fourthSplit = splitCode[3];

            if (
                LETTERS_ONLY.test(firstSplit) && LETTERS_ONLY.test(secondSplit) &&
                NUMBERS_ONLY.test(thirdSplit) && NUMBERS_ONLY.test(fourthSplit)
            ) {
                busNumber = thirdSplit + " " + fourthSplit;
                busStop = firstSplit + " " + secondSplit;
            }
        }

        return {
            busNumber,
            busStop
        };
    };

    static sortRoutes(routes: Array<Route>, method: SortMethod): Array<Route> {
        // Need to create a copy of the routes so that a different array instance is returned.
        // This is relevant for things like createSelector, since we need to break strict
        // equality when the sort order has changed.
        const sortedRoutes = [...routes];

        switch (method) {
            case SortMethod.SORT_BUS_NUMBER:
                return sortedRoutes.sort((route1, route2) => route1.getBusNumberInt() - route2.getBusNumberInt());
            case SortMethod.SORT_BUS_STOP:
                return sortedRoutes.sort((route1, route2) => route1.busStop.localeCompare(route2.busStop));
            case SortMethod.SORT_LAST_UPDATED:
                return sortedRoutes.sort((route1, route2) => route2.lastUpdated.getTime() - route1.lastUpdated.getTime());
            default:
                return sortedRoutes;
        }
    }
}

export default Route;
