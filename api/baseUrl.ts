import axios from 'axios';

export const baseUrl = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2QxMzIyMDY2ZjVjYzNhMjk2ZGFmYzkxNTA1NzBlNyIsInN1YiI6IjY0NWJiOWE3MTU2Y2M3MDBmZmE4ZDk2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oYdo9kqiuebdOPW_jUBId0xpyoLzGubnLI5Spyf3gfA',
  },
});
