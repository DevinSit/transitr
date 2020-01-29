import React from "react";
import {ActionBarMenu, ActionBarItem} from "@devinsit/react-native-components";
import connect, {ConnectedProps} from "./connect";

const HomeActionBarMenu = ({onSortClick}: ConnectedProps) => (
    <ActionBarMenu>
        <ActionBarItem
            icon="sort"
            tooltip="Sort"
            onClick={onSortClick}
        />
    </ActionBarMenu>
);

export default connect(HomeActionBarMenu);
