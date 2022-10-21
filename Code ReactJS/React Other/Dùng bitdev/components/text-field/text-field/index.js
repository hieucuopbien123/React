import * as React from 'react';
import { pick, omit } from 'lodash';
import { TextField as MuiTextField, FormControl } from '@material-ui/core';
import { Field } from 'react-final-form';
import { callAllFunctions, getComponentId, nameToLabel, processMetaForErrors } from '../utilities';
import MaskedInput from 'react-text-mask';

export function TextField(props) {
    let { id, name, label } = props;
    const {
        helperText,
        hideLabel = false,
        type = 'text',
        fieldSetProps = {
            fullWidth: true,
            margin: 'normal',
        },
        onChange,
        mask,
        guide,
        placeholderChar,
        keepCharPositions,
        pipe,
        showMask,
    } = props;
    id = getComponentId({ id: id, name: name });
    label = nameToLabel({ label, name });
    const fullFieldProps = pick(
        props,
        'allowNull',
        'defaultValue',
        'format',
        'formatOnBlur',
        'initialValue',
        'isEqual',
        'name',
        'parse',
        'subscription',
        'validate',
        'validateFields',
        'value'
    );
    const textFieldProps = pick(
        props,
        'autoComplete',
        'autoFocus',
        'disabled',
        'FormHelperTextProps',
        'InputLabelProps',
        'InputProps',
        'inputProps',
        'inputRef',
        'margin',
        'multiline',
        'placeholder',
        'rows',
        'rowsMax',
        'variant',
        'className'
    );
    textFieldProps.FormHelperTextProps = textFieldProps.FormHelperTextProps || {};
    textFieldProps.FormHelperTextProps.component =
        textFieldProps.FormHelperTextProps.component || 'pre';
    textFieldProps.InputLabelProps = textFieldProps.InputLabelProps || {};
    textFieldProps.InputLabelProps.htmlFor = textFieldProps.InputLabelProps.htmlFor || name;
    if (mask) {
        textFieldProps.InputProps = textFieldProps.InputProps || {};
        textFieldProps.InputProps.inputComponent = TextMask;
        textFieldProps.inputProps == textFieldProps.inputProps || {};
        textFieldProps.inputProps.guide = guide;
        textFieldProps.inputProps.placeholderChar = placeholderChar;
        textFieldProps.inputProps.keepCharPositions = keepCharPositions;
        textFieldProps.inputProps.pipe = pipe;
        textFieldProps.inputProps.showMask = showMask;
    }
    return (
        <FormControl
            // @ts-ignore
            component="fieldset"
            {...fieldSetProps}
        >
            <Field
                {...fullFieldProps}
                render={({ input, meta }) => {
                    const { errorMessage, showError } = processMetaForErrors(meta);
                    return (
                        <MuiTextField
                            {...omit(input, 'onChange')}
                            {...textFieldProps}
                            id={id}
                            type={type}
                            label={hideLabel ? '' : label}
                            helperText={showError ? errorMessage : helperText}
                            error={showError}
                            onChange={callAllFunctions(onChange, input.onChange)}
                        />
                    );
                }}
            />
        </FormControl>
    );
}

function TextMask(props) {
    return <MaskedInput {...omit(props, 'inputRef')} />;
}
