import { processMetaForErrors } from './';

describe('processMetaForErrors', () => {
    it('should not show an error if neither was provided', () => {
        const meta = {};
        const result = processMetaForErrors(meta);
        expect(result.showError).toEqual(false);
        expect(result.errorMessage).toEqual(undefined);
    });
    it('should not show an error if the form is pristine', () => {
        const meta = {
            error: 'bad',
            pristine: true,
            touched: false,
        };
        const result = processMetaForErrors(meta);
        expect(result.showError).toEqual(false);
        expect(result.errorMessage).toEqual(undefined);
    });
    it('should show the provided error form has been touched', () => {
        const meta = {
            error: 'bad',
            pristine: false,
            touched: true,
        };
        const result = processMetaForErrors(meta);
        expect(result.showError).toEqual(true);
        expect(result.errorMessage).toEqual(meta.error);
    });
    it('should show the provided submit error if the user has not yet changed the value', () => {
        const meta = {
            error: 'bad',
            submitError: 'Really bad',
            pristine: false,
            touched: true,
            dirtySinceLastSubmit: false,
            submitFailed: true,
        };
        const result = processMetaForErrors(meta);
        expect(result.showError).toEqual(true);
        expect(result.errorMessage).toEqual(meta.submitError);
    });
    it('should not show the provided submit error if the user has changed the value', () => {
        const meta = {
            error: undefined,
            submitError: 'Really bad',
            pristine: false,
            touched: true,
            dirtySinceLastSubmit: true,
            submitFailed: true,
        };
        const result = processMetaForErrors(meta);
        expect(result.showError).toEqual(false);
        expect(result.errorMessage).toEqual(undefined);
    });
    it('should display the error if the user has changed the value after a failed submit to an invalid value', () => {
        const meta = {
            error: 'bad',
            submitError: 'Really bad',
            pristine: false,
            touched: true,
            dirtySinceLastSubmit: true,
            submitFailed: true,
        };
        const result = processMetaForErrors(meta);
        expect(result.showError).toEqual(true);
        expect(result.errorMessage).toEqual(meta.error);
    });
});
