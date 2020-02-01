import {Dispatch} from "redux";
import {connect} from "react-redux";
import {appSlice, crossSliceSelectors, routesSlice, State} from "store/";

interface StateProps {
    busNumber: string;
    busStop: string;
    isVisible: boolean;
}

interface IntermediateStateProps extends StateProps {
    routeId: string;
}

interface DispatchProps {
    onCancel: () => void;
    onDelete: () => void;
}

interface IntermediateDispatchProps {
    onCancel: () => void;
    onDelete: (id: string) => void;
}

export interface ConnectedProps extends StateProps, DispatchProps {}

const mapStateToProps = (state: State): IntermediateStateProps => {
    const route = crossSliceSelectors.getDeleteRouteDialogRoute(state);

    return {
        routeId: route?.id,
        busNumber: route?.busNumber,
        busStop: route?.busStop,
        isVisible: !!route
    };
};

const mapDispatchToProps = (dispatch: Dispatch): IntermediateDispatchProps => ({
    onCancel: () => dispatch(appSlice.actions.setDeleteRouteDialogRouteId(null)),
    onDelete: (id) => {
        dispatch(routesSlice.actions.deleteRoute(id));
        dispatch(appSlice.actions.setDeleteRouteDialogRouteId(null));
    }
});

// Need to merge props to get the route ID to the onDelete function.
// Would have to orchestrate this at the saga level otherwise.
const mergeProps = (stateProps: IntermediateStateProps, dispatchProps: IntermediateDispatchProps): ConnectedProps => ({
    busNumber: stateProps.busNumber,
    busStop: stateProps.busStop,
    isVisible: stateProps.isVisible,
    onCancel: dispatchProps.onCancel,
    onDelete: () => dispatchProps.onDelete(stateProps.routeId)
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
