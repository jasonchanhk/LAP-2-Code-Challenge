const main = document.querySelector('main');
const form = document.querySelector('form')


const fields = [
    { tag: 'input', attributes: { type: 'text', name: 'title', placeholder: ` ` }, text: 'Title' },
    { tag: 'input', attributes: { type: 'text', name: 'name', placeholder: ` ` }, text: 'Pseudonym' },
    { tag: 'textarea', attributes: { name: 'body', placeholder: ` ` }, text: 'Your story...' }
]

window.addEventListener('hashchange', updateContent);
form.addEventListener('submit', formSubmit)

function updateContent() {
    let hash = window.location.hash.substring(1);
    console.log(hash)
    updateMain(hash);
}

function updateMain(hash) {
    main.innerHTML = '';
    if (hash) {
        loadPostFor(hash)
    } else {
        renderNewBookForm()
    }
}

async function formSubmit(e) {
    e.preventDefault()
    postBook(e)
}

function renderNewBookForm() {
    const form = document.createElement('form');
    fields.forEach(f => {
        const label = document.createElement('label')
        label.setAttribute('class', 'custom-field')

        const span = document.createElement('span')
        span.setAttribute('class', 'placeholder')
        span.textContent = f.text

        const field = document.createElement(f.tag);
        Object.entries(f.attributes).forEach(([a, v]) => field.setAttribute(a, v))
        label.appendChild(field)
        label.appendChild(span)
        form.appendChild(label);
    })
    const submit = document.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.setAttribute('class', 'submit')
    submit.setAttribute('value', 'Publish')

    form.appendChild(submit)
    form.onsubmit = postBook;
    main.appendChild(form);
}

async function loadPostFor(id) {
    const data = await getPost(id);
    console.log(data)
    const div = document.createElement('div')
    
    const title = document.createElement('p');
    title.setAttribute('class', 'title')
    title.textContent = data.title

    const time = document.createElement('span');
    time.setAttribute('class', 'post-time')
    time.textContent = `@ ${data.time?.split(',')[0]}` || 'Not found'

    const name = document.createElement('p');
    name.setAttribute('class', 'name')
    name.textContent = data.name

    name.appendChild(time)

    const body = document.createElement('p');
    body.setAttribute('class', 'body')
    body.textContent = data.body

    div.appendChild(title)
    div.appendChild(name)
    div.appendChild(body)


    const exit = document.createElement('a')
    exit.textContent = 'X'
    exit.setAttribute('class', 'exit')
    exit.setAttribute('href', '#')

    div.appendChild(exit);
    main.appendChild(div);
}

