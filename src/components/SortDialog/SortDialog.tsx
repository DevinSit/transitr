import React, {useMemo} from "react";
import {ModalDialog, RadioButton} from "@devinsit/react-native-components";
import {Route} from "models/";
import {SortMethod} from "models/Route";
import {DEFAULT_SPACING} from "styles/dimens";
import connect, {ConnectedProps} from "./connect";

const LABELS: Array<SortMethod> = [
    SortMethod.SORT_BUS_STOP,
    SortMethod.SORT_BUS_NUMBER,
    SortMethod.SORT_LAST_UPDATED
];

const SortDialog = ({
    value = SortMethod.SORT_BUS_STOP,
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
