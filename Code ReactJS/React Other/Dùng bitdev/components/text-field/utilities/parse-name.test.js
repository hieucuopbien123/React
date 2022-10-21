import { parseName } from './';

describe('parseName', () => {
    // it('should throw an error when empty object is passed', () => {
    //     // $FlowFixMe
    //     expect(() => parseName({})).toThrow();
    // });
    // it('should throw an error when null is passed', () => {
    //     // $FlowFixMe
    //     expect(() => parseName(null)).toThrow();
    // });
    // it('should throw an error when undefined is passed', () => {
    //     // $FlowFixMe
    //     expect(() => parseName(undefined)).toThrow();
    // });
    it('should throw an error when empty string is passed', () => {
        expect(() => parseName('')).toThrow();
    });
    it('should throw an error when whitespace name is passed', () => {
        expect(() => parseName('\r\n\t ')).toThrow();
    });
    it('should use the name it is provided', () => {
        expect(parseName('asd')).toEqual('asd');
    });
    describe('stripBeforeLastDot', () => {
        it('should not strip the content before the dot if the argument is set to false', () => {
            expect(parseName('doctors[0].doctorsName', { stripBeforeLastDot: false })).toEqual(
                'doctors[0].doctorsName'
            );
        });
    });
});
