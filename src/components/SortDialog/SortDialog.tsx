import React, {useMemo} from "react";
import {ModalDialog, RadioButton} from "@devinsit/react-native-components";
import {Route} from "models/";
import {DEFAULT_SPACING} from "styles/dimens";
import connect, {ConnectedProps} from "./connect";

const LABELS = [Route.SORT_BUS_STOP, Route.SORT_BUS_NUMBER, Route.SORT_LAST_UPDATED];

const SortDialog = ({
    value = Route.SORT_BUS_STOP,
    isVisible = false,
    onValueChange,
    onClose
}: ConnectedProps) => {
    const labels = useMemo(() => (
        LABELS.map((label) => (
            <RadioButton
                key={label}
                value={label}
                label={label}
                isSelected={value === label}
                onClick={onValueChange}
            />
        ))
    ), [value, onValueChange]);

    return (
        <ModalDialog
            headerText="Sort By"
            negativeButtonText="Cancel"
            isVisible={isVisible}
            onClose={onClose}
            onNegativeButtonClick={onClose}
        >
            {labels}
        </ModalDialog>
    );
};

export default connect(SortDialog);
