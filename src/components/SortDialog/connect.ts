import {Dispatch} from "redux";
import {connect} from "react-redux";
import {appSlice, State} from "store/";

interface StateProps {
    value: string;
    isVisible: boolean;
}

interface DispatchProps {
    onValueChange: (string) => void;
    onClose: () => void;
}

export interface ConnectedProps extends StateProps, DispatchProps {};

const mapStateToProps = (state: State): StateProps => ({
    value: appSlice.selectors.getSortBy(state),
    isVisible: appSlice.selectors.getSortDialogVisibility(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    onValueChange: (value: string) => {
        dispatch(appSlice.actions.setSortBy(value));

        // Short timeout so that the dialog shows the change in value before closing
        // (i.e. the radio button has its bubble change from one value to another).
        // Improves the user experience by letting the user know that the change _has_ taken place.
        setTimeout(() => {
            dispatch(appSlice.actions.setSortDialogVisibility(false));
        }, 100);
    },
    onClose: () => dispatch(appSlice.actions.setSortDialogVisibility(false))
});

export default connect(mapStateToProps, mapDispatchToProps);
