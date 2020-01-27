import uuidv4 from "uuid/v4";

class ArrivalTime {
    id: string;
    arrivalTimeSetId: string;
    time: string;
    arrivingSoon: boolean

    constructor({id = uuidv4(), arrivalTimeSetId = "", time = "", arrivingSoon = false}: ArrivalTime) {
        this.id = id;
        this.arrivalTimeSetId = arrivalTimeSetId;
        this.time = time;
        this.arrivingSoon = arrivingSoon;
    }
}

export default ArrivalTime;
