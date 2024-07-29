/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
export function add(x:number,y:number){
    return x+y;
}

describe('testes iniciais',()=> {
    test('add number',()=> {
     expect(add(1,2)).toEqual(3);
    })
})