import { removeUndefined, id } from 'tools';
import { createHash } from 'crypto';

export type GroupInvitationData = {
  /**
   * ID is actually the hashed secret key for convenient
   * lookup.
   */
  id: string;
  groupId: string;
  lifetimeHours: number;
};

export default class GroupInvitation {
  data: GroupInvitationData;
  /**
   * The secret key is stored in plaintext on the invitation after
   * initial creation, but is not persisted to storage. This way
   * it can be returned to the creator for sending after the invite
   * is placed.
   */
  plaintextSecretKey: string;
  /**
   * Calculated at retrieve time
   */
  expired: boolean;

  constructor(data: GroupInvitationData) {
    this.data = data;
  }

  get id() {
    return this.data.id;
  }

  get groupId() {
    return this.data.groupId;
  }

  get lifetimeHours() {
    return this.data.lifetimeHours;
  }

  static fromJSON(data) {
    return new GroupInvitation(data);
  }

  static create = async (groupId: string) => {
    const secretKey = id();
    const hashed = await GroupInvitation.hashId(secretKey);
    const invitation = new GroupInvitation({
      id: hashed,
      groupId,
      lifetimeHours: 24,
    });
    invitation.plaintextSecretKey = secretKey;
    return invitation;
  };

  // a dead simple one way hash will do. Data is not long-lived
  // or related to account access. We just take a precaution here
  // to prevent a database leak from granting attackers the ability
  // to join groups unwanted.
  static hashId = async (input: string): Promise<string> => {
    const sha256 = createHash('sha256');
    sha256.update(input);
    return sha256.digest('hex');
  };

  toJSON() {
    return removeUndefined(this.data);
  }
}
