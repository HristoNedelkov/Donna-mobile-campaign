const apiKey = "AIzaSyBRNe_ynu32cJX7IezjZiprcqvCIsbqvMs";
const dataBaseUrl = "https://donna-mobile-campaign-default-rtdb.firebaseio.com/";

 
const commentServices = {
  async add(commentData) {
    let res = await fetch(`${dataBaseUrl}/comments.json`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    let data = await res.json();
    return data;
  },
  async getAll() {
    let res = await fetch(`${dataBaseUrl}/comments.json`);
    let data = await res.json();
    if (!data) {
      return {};
    }
    return Object.keys(data).map((key) => ({ key, ...data[key] }));
  }
}; 