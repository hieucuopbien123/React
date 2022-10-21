import { getComponentId } from './';

describe('getComponentId', () => {
    // it('should throw an error when empty object is passed', () => {
    //     // $FlowFixMe
    //     expect(() => getComponentId({})).toThrow();
    // });
    // it('should throw an error when null is passed', () => {
    //     // $FlowFixMe
    //     expect(() => getComponentId(null)).toThrow();
    // });
    // it('should throw an error when undefined is passed', () => {
    //     // $FlowFixMe
    //     expect(() => getComponentId(undefined)).toThrow();
    // });
    // it('should throw an error when empty string is passed', () => {
    //     // $FlowFixMe
    //     expect(() => getComponentId('')).toThrow();
    // });
    // it('should throw an error when non empty string is passed', () => {
    //     // $FlowFixMe
    //     expect(() => getComponentId('asd')).toThrow();
    // });
    describe('name', () => {
        it('should throw an error when empty name is passed', () => {
            expect(() => getComponentId({ name: '' })).toThrow();
        });
        it('should throw an error when whitespace name is passed', () => {
            expect(() => getComponentId({ name: '\r\n\t ' })).toThrow();
        });
        it('should use the name if id is not provided', () => {
            expect(getComponentId({ name: 'asd' })).toEqual('asd');
        });
        it('should use the name without removing dots if provided.', () => {
            expect(getComponentId({ name: 'doctors[0].doctorsName' })).toEqual(
                'doctors[0].doctorsName'
            );
        });
    });
    describe('id', () => {
        it('should use the name if id is null', () => {
            // $FlowFixMe
            expect(getComponentId({ name: 'asd', id: null })).toEqual('asd');
        });
        it('should use the name if id is undefined', () => {
            expect(getComponentId({ name: 'asd', id: undefined })).toEqual('asd');
        });
        it('should use the name if id is just whitespace', () => {
            expect(getComponentId({ name: 'asd', id: '\r\n\t ' })).toEqual('asd');
        });
        it('should use the id as is if one is set', () => {
            expect(getComponentId({ name: 'asd', id: 'bobBobson' })).toEqual('bobBobson');
        });
        it('should trim the id if starts with or ends with whitespace', () => {
            expect(getComponentId({ name: 'asd', id: 'bobBobson\n\t ' })).toEqual('bobBobson');
        });
    });
});
