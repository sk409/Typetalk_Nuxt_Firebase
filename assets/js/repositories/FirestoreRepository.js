export default class FirestoreRepository {
  convert(doc) {
    const data = doc.data();
    data.id = doc.id;
    return data;
  }
}
