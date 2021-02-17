// function join(a: number | string, b: number | string) {
//   return `${a} ${b}`;
// }

function join<T>(a: T, b: T) {
  return `${a} ${b}`;
}

join<number>(1, 2);
join<string>("1", "2");
// join<number>(1, '2'); //这行报错
// join<string>(1, '2'); //这行也报错

function getArr<T>(arr: T[]) {
  return arr;
}

getArr<number>([1, 2, 3])
getArr<string>(['g', 'q', 'f'])

function getVal<T>(obj: T, k: keyof T){
  return obj[k];
}

interface Person {
  name: string;
  age: number;
}

getVal<Person>({
  name: 'gqf',
  age: 29
}, 'age')

function manyTest<K, V>(a: K, b: V) {
  return `${a} ${b}`
}

manyTest<number, string>(1, '2')
