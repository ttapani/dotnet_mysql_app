// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

// export const gitHubApi = (username) => {
//     return fetch(`https://api.github.com/users/${username}`)
//       .then(response => {
//         return response.json()
//           .then(({ login, avatar_url, html_url }) =>  ({ login, avatar_url, html_url }));
//       })
//       .catch(error => {
//         throw error;
//       })
//   };

// const headers = new Headers({'Content-type': 'application/json'});

// fetch('api/auth', {
//     method: 'POST',
//     headers: headers,
//     body: JSON.stringify(data),
// });