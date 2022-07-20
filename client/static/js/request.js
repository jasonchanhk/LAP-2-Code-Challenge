async function postBook(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        
        const response = await fetch('https://lap2-code-challenge.herokuapp.com/posts', options);
        const { id, err } = await response.json();
        if(err) { 
            throw Error(err) 
        } else {
            window.location.hash = `#${id}`
        }
    } catch (err) {
        console.warn(err);
    }
}

async function getPost(id) {
    try {
        const response = await fetch(`https://lap2-code-challenge.herokuapp.com/posts/${id}`);
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
        console.warn(err);
    }
}
