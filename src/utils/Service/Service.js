const SERVER = 'https://web-rtc-backend-test.herokuapp.com';

export const getApi = (api) => {
    return {
        url: SERVER+'/'+api,
    };
  };

export const fetchData = async (api) => {
      // console.log("calllllled");
    const res = await fetch(SERVER+'/'+api)
    const json = await res.json();
    // console.log(json);
    return json
}

export const fetchPostData = async (api,bodyParam) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyParam)
};
console.log(requestOptions);
const res = await fetch(SERVER+'/'+api,requestOptions)
const json = await res.json();
console.log(json);
return json
}

export const fetchLoginPostData = async (api,bodyParam) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bodyParam)
  };
  console.log(requestOptions);
  const res = await fetch(SERVER+'/'+api,requestOptions);
  return res;
}

export const fetchDeleteData = async (api,bodyParam) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyParam)
};
console.log(requestOptions);
const res = await fetch(SERVER+'/'+api,requestOptions);
return res;
}


export const pushAuditsData = async (bodyParam) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyParam)
};
const res = await fetch(SERVER+'/createAuditReport',requestOptions);
return res;
}