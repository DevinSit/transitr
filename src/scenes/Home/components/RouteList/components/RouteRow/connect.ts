import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ArrivalTime} from "models/";
import {crossSliceSelectors, routesSlice, State} from "store/";

interface OwnProps {
    id: string;
}

interface StateProps {
    busNumber: string;
    busStop: string;
    arrivalTimes: Array<ArrivalTime>;
    arrivalMessage: string;
}

interface DispatchProps {
    onRefresh: () => void;
}

export interface ConnectedProps extends StateProps, DispatchProps {};

const mapStateToProps = (state: State, ownProps: OwnProps) => {
    const {id} = ownProps;

    const getRoute = crossSliceSelectors.getRoute(id);

    return (state: State): StateProps => {
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

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    onRefresh: () => dispatch(routesSlice.actions.sendSms(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps);
