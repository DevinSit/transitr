import {connect} from "react-redux";
import {crossSliceSelectors} from "store/";

const mapStateToProps = (state) => ({
    routes: crossSliceSelectors.getRoutes(state)
});

export default connect(mapStateToProps);
