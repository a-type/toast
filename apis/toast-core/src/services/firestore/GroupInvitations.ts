import { Firestore } from '@google-cloud/firestore';
import GroupInvitation from 'models/GroupInvitation';
import { addHours, isAfter } from 'date-fns';

const COLLECTION = 'groupInvitations';

export default class GroupInvitations {
  firestore: Firestore;

  constructor(service: { firestore: Firestore }) {
    this.firestore = service.firestore;
  }

  set = async (invitation: GroupInvitation) => {
    const document = this.firestore.doc(`${COLLECTION}/${invitation.id}`);
    await document.set(invitation.toJSON());
    return invitation;
  };

  get = async (id: string) => {
    const document = this.firestore.doc(`${COLLECTION}/${id}`);
    const snapshot = await document.get();
    if (!snapshot.exists) {
      return null;
    }
    const invitation = GroupInvitation.fromJSON(snapshot.data());
    invitation.expired = isAfter(
      new Date(),
      addHours(snapshot.createTime.toDate(), invitation.lifetimeHours),
    );
    return invitation;
  };

  delete = async (id: string) => {
    const document = this.firestore.doc(`${COLLECTION}/${id}`);
    await document.delete();
  };
}
