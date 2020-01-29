import React, {useMemo} from "react";
import {ModalDialog, RadioButton} from "@devinsit/react-native-components";
import {Route} from "models/";
import {DEFAULT_SPACING} from "styles/dimens";

const LABELS = [Route.SORT_BUS_STOP, Route.SORT_BUS_NUMBER, Route.SORT_LAST_UPDATED];

interface Props {
    value: string;
    isVisible: boolean;
    onValueChange: () => void;
    onClose: () => void;
}

const SortDialog = ({
    value = Route.SORT_BUS_STOP,
    isVisible = false,
    onValueChange,
    onClose
}: Props) => {
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

export default SortDialog;
