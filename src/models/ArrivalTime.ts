import uuidv4 from "uuid/v4";

// Declare the same class props on a separate Constructor interface
// so that all attributes are optional when constructing an instance.
interface Constructor {
    id?: string;
    arrivalTimeSetId?: string;
    time?: string;
    arrivingSoon?: boolean
}

class ArrivalTime {
    id: string;
    arrivalTimeSetId: string;
    time: string;
    arrivingSoon: boolean

    constructor({
        id = uuidv4(),
        arrivalTimeSetId = "",
        time = "",
        arrivingSoon = false
    }: Constructor = {}) {
        this.id = id;
        this.arrivalTimeSetId = arrivalTimeSetId;
        this.time = time;
        this.arrivingSoon = arrivingSoon;
    }
}

export default ArrivalTime;
