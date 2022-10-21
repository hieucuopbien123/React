import { EVENT1 } from './const.js'

export const addNumber = number => {
    console.log(`addNumber lấy đối số ${number} và trả ra 1 object action`)
    console.log(number);
    return {
        type: EVENT1,
        data: number
    }
}