import {Dispatch} from "redux";
import {connect} from "react-redux";
import {Route} from "models/";
import {routesSlice} from "store/";

export interface ConnectedProps {
    onAddRoute: (route: Route) => void
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onAddRoute: (route: Route) => dispatch(routesSlice.actions.createRoute(route))
});

export default connect(null, mapDispatchToProps);
