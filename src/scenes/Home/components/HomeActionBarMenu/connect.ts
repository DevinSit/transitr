import {Dispatch} from "redux";
import {connect} from "react-redux";
import {appSlice} from "store/";

export interface ConnectedProps {
    onSortClick: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ConnectedProps => ({
    onSortClick: () => dispatch(appSlice.actions.setSortDialogVisibility(true))
});

export default connect(null, mapDispatchToProps);
