import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/api',
// }); 

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        "Content-Type": "application/json",
    }
}); 

class APIClient<T> {
    endpoint: string;

     constructor(endpoint: string){
        this.endpoint = endpoint;
     }

     post = (data: T) => {
      return axiosInstance
          .post<T>(this.endpoint, data)
          .then(res => res.data);
  }

    get = (id: number | string) => {
    return axiosInstance
    .get<T>(this.endpoint + '/' + id)
    .then(res => res.data);
 }

}

export default APIClient;