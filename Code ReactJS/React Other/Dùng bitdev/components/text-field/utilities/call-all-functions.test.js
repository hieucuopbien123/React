import { callAllFunctions } from './';

describe('callAllFunctions', () => {
    it('should return a function that calls the passed in function', done => {
        const doWork = callAllFunctions(done);
        doWork();
    });
    it('should pass the provided argument to the function', done => {
        function checkArguments(value) {
            expect(value).toEqual(42);
            done();
        }
        const doWork = callAllFunctions(checkArguments);
        doWork(42);
    });
    it('should only execute the arguments passed in as functions', done => {
        function checkArguments(value) {
            expect(value).toEqual(42);
            done();
        }
        const doWork = callAllFunctions(
            null,
            undefined,
            1,
            0,
            {},
            'asd',
            '',
            true,
            false,
            checkArguments
        );
        expect(() => doWork(42)).not.toThrow();
    });
});
