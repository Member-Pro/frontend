export default class Requirement {
  public name = '';
  public description = '';

  public type = 0;

  public minCount: number | null = 0;
  public maxCount: number | null = 0;
}
