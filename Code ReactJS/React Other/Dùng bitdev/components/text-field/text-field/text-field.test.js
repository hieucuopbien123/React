import * as React from 'react';
import { render } from 'react-testing-library';
import { TextField } from './';
import { Form } from 'react-final-form';
import 'jest-dom/extend-expect';

describe('TextField', () => {
    it('Should render successfully with just a name provided, the display label should equal a capitalised version of the name', () => {
        const { getByText } = render(
            <Form
                onSubmit={() => null}
                render={() => {
                    return <TextField name="testing" />;
                }}
            />
        );
        getByText('Testing');
    });
});
