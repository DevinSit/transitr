import React from "react";
import {ActionBarMenu, ActionBarItem} from "@devinsit/react-native-components";

interface Props {
    onSortClick: () => void;
}

const HomeActionBarMenu = ({onSortClick}: Props) => (
    <ActionBarMenu>
        <ActionBarItem
            icon="sort"
            tooltip="Sort"
            onClick={onSortClick}
        />
    </ActionBarMenu>
);

export default HomeActionBarMenu;
