import firebase from "firebase";

export default class RepositoryFirestore {
  constructor(base) {
    this.base = base;
  }

  convert(doc) {
    const data = doc.data();
    data.id = doc.id;
    return data;
  }

  _find(option) {
    return new Promise(async resolve => {
      let collection = firebase.firestore().collection(this.base);
      const where = option.where;
      if (where) {
        if (where.length === 3 && typeof where[0] === "string") {
          collection = collection.where(where[0], where[1], where[2]);
        } else {
          where.forEach(query => {
            collection = collection.where(query[0], query[1], query[2]);
          });
        }
      }
      const orderBy = option.orderBy;
      if (orderBy) {
        if (typeof orderBy === "string") {
          const components = orderBy.split(" ");
          const field = components[0];
          const direction = components.length === 1 ? "asc" : components[1];
          collection = collection.orderBy(field, direction);
        }
      }
      const startAt = option.startAt;
      if (startAt) {
        const doc = await firebase
          .firestore()
          .collection(this.base)
          .doc(startAfter)
          .get();
        collection = collection.startAt(doc);
      }
      const startAfter = option.startAfter;
      if (startAfter) {
        const doc = await firebase
          .firestore()
          .collection(this.base)
          .doc(startAfter)
          .get();
        collection = collection.startAfter(doc);
      }
      const endAt = option.endAt;
      if (endAt) {
        const doc = await firebase
          .firestore()
          .collection(this.base)
          .doc(startAfter)
          .get();
        collection = collection.endAt(doc);
      }
      const endBefore = option.endBefore;
      if (endBefore) {
        const doc = await firebase
          .firestore()
          .collection(this.base)
          .doc(startAfter)
          .get();
        collection = collection.endBefore(doc);
      }
      const limit = option.limit;
      if (limit) {
        collection = collection.limit(limit);
      }
      collection.get().then(snapshot => {
        resolve(snapshot);
      });
    });
  }

  findAll(option) {
    return new Promise(resolve => {
      this._find(option).then(snapshot => {
        const objects = [];
        snapshot.forEach(doc => {
          objects.push(this.convert(doc));
        });
        resolve(objects);
      });
    });
  }

  findOne(option) {
    return new Promise(resolve => {
      this._find(option).then(snapshot => {
        if (snapshot.size === 0) {
          resolve(null);
          return;
        }
        const object = this.convert(snapshot.docs[0]);
        resolve(object);
      });
    });
  }
}
