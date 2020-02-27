export default class RepositoryFirestore {
  convert(doc) {
    const data = doc.data();
    data.id = doc.id;
    return data;
  }
}
