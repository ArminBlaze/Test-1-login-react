async function getUrl(url, data) {

  let response;

  if(data) {
    //POST
    response = await fetch( url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    } );
  }
  else {
    //GET
    response = await fetch(url);
  }


  if(!response.ok) {
    console.log('Ошибка сервера');
    console.dir(response);
    throw new Error(`Ошибка сервера: ${response.status} ${response.statusText} \nЗапрашиваемый адрес: ${response.url}`)
  } 

  const json = await response.json();

  return json;
}

export default getUrl;