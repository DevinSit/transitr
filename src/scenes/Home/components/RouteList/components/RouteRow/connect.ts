import {connect} from "react-redux";
import {ArrivalTime} from "models/";
import {crossSliceSelectors, State} from "store/";

interface OwnProps {
    id: string;
}

export interface ConnectedProps {
    busNumber: string;
    busStop: string;
    arrivalTimes: Array<ArrivalTime>;
    arrivalMessage: string;
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
    const {id} = ownProps;

    const getRoute = crossSliceSelectors.getRoute(id);

    return (state: State): ConnectedProps => {
        const route = getRoute(state);
        const arrivalTimes = route?.getLatestArrivalTimes();
        const arrivalMessage = route?.getLatestArrivalMessage();

        return {
            busNumber: route?.busNumber,
            busStop: route?.busStop,
            arrivalTimes,
            arrivalMessage
        };
    };
};

export default connect(mapStateToProps);
