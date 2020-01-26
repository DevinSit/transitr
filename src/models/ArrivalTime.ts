import uuidv4 from "uuid/v4";

interface Props {
    id: string,
    arrivalTimeSetId: string,
    time: string,
    arrivingSoon: boolean
};

class ArrivalTime {
    id: string;
    arrivalTimeSetId: string;
    time: string;
    arrivingSoon: boolean

    constructor({id, arrivalTimeSetId, time, arrivingSoon}: Props = {}) {
        this.id = id || uuidv4();
        this.arrivalTimeSetId = arrivalTimeSetId;
        this.time = time || "";
        this.arrivingSoon = arrivingSoon || false;
    }
}

export default ArrivalTime;
