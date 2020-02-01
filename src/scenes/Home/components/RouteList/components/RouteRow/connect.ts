import {Dispatch} from "redux";
import {connect} from "react-redux";
import {ArrivalTime} from "models/";
import {appSlice, crossSliceSelectors, routesSlice, State} from "store/";

interface OwnProps {
    id: string;
}

interface StateProps {
    arrivalMessage: string;
    arrivalTimes: Array<ArrivalTime>;
    busNumber: string;
    busStop: string;
    lastUpdated: string;
}

interface DispatchProps {
    onDelete: () => void;
    onRefresh: () => void;
}

export interface ConnectedProps extends StateProps, DispatchProps {}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
    const {id} = ownProps;

    const getRoute = crossSliceSelectors.getRoute(id);

    return (state: State): StateProps => {
        const route = getRoute(state);
        const arrivalTimes = route?.getLatestArrivalTimes();
        const arrivalMessage = route?.getLatestArrivalMessage();

        return {
            arrivalMessage,
            arrivalTimes,
            busNumber: route?.busNumber,
            busStop: route?.busStop,
            lastUpdated: route?.lastUpdated.toString()
        };
    };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps): DispatchProps => ({
    onDelete: () => dispatch(appSlice.actions.setDeleteRouteDialogRouteId(ownProps.id)),
    onRefresh: () => dispatch(routesSlice.actions.sendSms(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps);
