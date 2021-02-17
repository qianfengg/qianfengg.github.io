interface Skill {
  name: string;
  canDamage: boolean; // 是否是直接造成伤害的技能
}

class DesignHero<T extends Skill> {
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
