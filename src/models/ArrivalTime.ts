import uuidv4 from "uuid/v4";

interface Props {
    id: ?string,
    time: ?string,
    arrivingSoon: ?boolean
};

class ArrivalTime {
    id: ?string;
    time: ?string;
    arrivingSoon: ?boolean

    constructor({id, time, arrivingSoon}: Props = {}) {
        this.id = id || uuidv4();
        this.time = time || "";
        this.arrivingSoon = arrivingSoon || false;
    }
}

export default ArrivalTime;
