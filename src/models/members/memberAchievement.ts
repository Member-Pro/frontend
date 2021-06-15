import Achievement from '../achievements/achievement';
import { SimpleMember } from './member';

export default class MemberAchievement {
  public id = 0;

  public memberId = 0;
  public member: SimpleMember | null = null;

  public achievementId = 0;
  public achievement: Achievement | null = null;

  public earnedOn = '';
  public displayPublicly = false;

  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
      this.member = new SimpleMember(data.member);
      this.achievement = new Achievement(data.achievement);
    }
  }
}
