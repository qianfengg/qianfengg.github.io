# TS泛型基础知识 之 萌新总结

这是一篇本来在假期前就应该总结输出的文章，可惜由于自己太懒，太咸鱼，于是balabalabala(省略几万字的理由)。但真相永远只有一个，就是说多了都是借口，正好假期余额不足了，是时候收心，作为萌新，和大家一起巩固总结下之前看的TS泛型的相关知识，争取输出一篇和各位萌新一看就懂，就能掌握的基础泛型知识文章，大概通过以下三点来说明

* 在函数中使用泛型
* 在类中使用泛型
* 在接口中使用泛型

## 在函数中使用泛型

### 函数中使用泛型 - 案例一

先来看这么一段代码
```ts
function join(a: number | string, b: number | string) {
  return `${a} ${b}`;
}
```
这是一段很水的代码，作为萌新也一下就能看出来，a和b能传数字也能传字符串，最后的返回值，就是利用字符串模板将两者拼起来，其中我们传值有这么4种可能
* a数字 b数字
* a字符串 b字符串
* a数字 b字符串
* a字符串 b数字
但最终的结果依然是拼接，这个时候来了这么个需求，我们必须2个变量的类型要统一，我擦类，这怎么搞，这个时候掏出泛型，改写下代码并这么使用就可以了
```ts
function join<T> (a: T, b: T) {
  return `${a} ${b}`;
}

join<number>(1, 2);
join<string>('1', '2');
// join<number>(1, '2'); //这行报错，你都规定是number了，字符串2是什么鬼
// join<string>(1, '2'); //这行也报错，你都规定是string了，数字1是什么鬼
```
在方法执行的括号前加上尖括号，指定类型就可以了(可以省略尖括号，ts会类型推断，但不建议这么做)，这样也约束了参数的类型，这就是最基本最基础的一个使用方式了

### 函数中使用泛型 - 案例二

我们同样也可以约束数组每一项的类型，比如写一个最简单的函数，传入个数组，并返回这个数组
```ts
function getArr<T>(arr: T[]) {
  return arr;
}

getArr<number>([1, 2, 3]) //指定了number，那我的数组必须每一项也是number，如果不是就报错
getArr<string>(['g', 'q', 'f']) //同理这里指定了string
```

### 函数中使用泛型 - 案例三

获取对象对应key的value，那大家都知道使用`obj[key]`就可以了，但有的对象我们并不知道有没有这个key，用泛型的话可以很好的解决这个问题
```ts
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
}, 'age') // 这里的key值只能传name或者age，否则就会报错，这个就是泛型的力量
```

### 函数中使用泛型 - 案例四

其实我们的案例一可以改造成必须拼接数字和字符串，这里可以使用多个泛型的语法
```ts
function manyTest<K, V>(a: K, b: V) {
  return `${a} ${b}`
}

manyTest<number, string>(1, '2') //泛型指定了第一个参数是数字，第二个参数是字符串，所以对应的参数也要这么传
```

## 在类中使用泛型

我们来模拟这样一个场景，设计我们的英雄技能吧！

### 在类中使用泛型 - 版本一

初始版本很简单，我们先不用泛型，随意写个类，传入四个技能的数组，并且有个获取技能的方法

```ts
class DesignHero {
  constructor(private skills: string[]){}

  getSkill (index: number) {
    console.log(this.skills[index])
    return this.skills[index];
  }
}

const hero = new DesignHero(['q', 'w', 'e', 'r']) // string[] 所以传入字符串数组
hero.getSkill(3)
```

### 在类中使用泛型 - 版本二

我们平时不是还喜欢直接用数字来说明技能吗，比如一二三技能，那我们这次改造下，使用数字数组
```ts
class DesignHero {
  constructor(private skills: number[]){} // 这行从string[]改成number[]

  getSkill (index: number) {
    console.log(this.skills[index])
    return this.skills[index];
  }
}

const hero = new DesignHero([1, 2, 3, 4]) // number[] 所以传入数字数组
hero.getSkill(3)
```

### 在类中使用泛型 - 版本三

写死的方式有点蠢，我们前面不是学了基础的泛型知识吧，那赶紧用泛型改造下案例吧
```ts
class DesignHero<T> {
  constructor(private skills: T[]){}

  getSkill (index: number) {
    console.log(this.skills[index])
    return this.skills[index];
  }
}

const heroNumberSkill = new DesignHero<number>([1, 2, 3, 4]) // 泛型好泛型棒，我可以指定使用数字作为技能描述
heroNumberSkill.getSkill(1)
const heroStringSkill = new DesignHero<string>(['q', 'w', 'e', 'r']) // 泛型好泛型棒，我可以指定使用字符串作为技能描述
heroStringSkill.getSkill(2)
```

### 在类中使用泛型 - 版本四

泛型也可以使用继承，比如只能接受字符串或者数字 `<T extends string | number>`，具体代码如下
```ts
class DesignHero<T extends string | number> { // 如果把继承的string | number 比如改成boolean， 那下面肯定就报错了
  constructor(private skills: T[]){}

  getSkill (index: number) {
    console.log(this.skills[index])
    return this.skills[index];
  }
}

const heroNumberSkill = new DesignHero<number>([1, 2, 3, 4])
heroNumberSkill.getSkill(1)
const heroStringSkill = new DesignHero<string>(['q', 'w', 'e', 'r'])
heroStringSkill.getSkill(2)
```

### 在类中使用泛型 - 版本五

最终版本，那就是泛型继承接口了，我们可以规定数组中的每一项必须是个对象，且有规定的格式
```ts
interface Skill {
  name: string;
  canDamage: boolean; // 是否是直接造成伤害的技能
}

class DesignHero<T extends Skill> { // 规定了数组每一项的Skill技能，要遵循接口的格式，有name和canDamage字段
  constructor(private skills: T[]){}

  getSkillName (index: number) {
    console.log(this.skills[index].name)
    return this.skills[index].name;
  }
}

const finalHero = new DesignHero([
  {
    name: '一技能',
    canDamage: true,
  },
  {
    name: '二技能',
    canDamage: false,
  },
  {
    name: '三技能',
    canDamage: false,
  },
  {
    name: '四技能',
    canDamage: true,
  }
])

finalHero.getSkillName(0)

```


## 在接口中使用泛型

最后我们来学习下接口中的泛型，来模拟下请求响应的场景，初始代码如下
```ts
interface IResponseData{
    code: number;
    message?: string;
    data: any;
}
async function getData(url: string){
  let response = await fetch(url);
  let data = await response.json();
  return data;
} 
```
上述代码很明显有个问题，我们会发现该接口的data项的具体格式不确定，不同的接口会返回的数据是不一样的，当我们想根据具体当前请求的接口返回具体data格式的时候，就比较麻烦了，因为getData并不清楚你调用的具体接口是什么，对应的数据又会是什么，这个时候我们可以对IResponseData使用泛型，完整代码如下
```ts
interface IResponseData<T>{
    code: number;
    message?: string;
    data: T;
}

// 用户接口
interface IResponseUserData{
    id: number;
    username: string;
    email: string;
}

// 文章接口
interface IResponseArticleData{
    id: number;
    title: string;
    author: IResponseUserData; 
} 

async function getData<U>(url: string){
    let response = await fetch(url);
    let data: Promise<IResponseData<U>> = await response.json(); // 注意这里返回的是个Promise，然后我们根据不同的接口，指定不同的data数据格式
    return data;
} 

(async function(){
    let userData = await getData<IResponseUserData>('/user');
    userData.data.username;

    let articleData = await getData<IResponseArticleData>('/article');
    articleData.data.author.email;
})()  
```

## 总结

其实好像也没什么好总结的，毕竟都是基础知识，也在本文中基本都提到了，如果有什么错误或者遗漏，欢迎大佬们指正，让萌新的我继续变强(是不是太皮了哈哈)，最后祝大家好好享受最后的假期，假期过后的工作和摸鱼也都顺顺利利~这里是梅丽奥猪猪，谢谢大家支持~

