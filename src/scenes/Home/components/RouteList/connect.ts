import {connect} from "react-redux";
import {Route} from "models/";
import {crossSliceSelectors, State} from "store/";

export interface ConnectedProps {
    routes: Array<Route>
}

const mapStateToProps = (state: State): ConnectedProps => ({
    routes: crossSliceSelectors.getSortedRoutes(state)
});

export default connect(mapStateToProps);
