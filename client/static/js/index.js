const main = document.querySelector('main');
const form = document.querySelector('form')


const fields = [
    { tag: 'input', attributes: { type: 'text', name: 'title', placeholder: ` ` }, text: 'Title' },
    { tag: 'input', attributes: { type: 'text', name: 'name', placeholder: ` ` }, text: 'Name' },
    { tag: 'textarea', attributes: { name: 'body', placeholder: ` ` }, text: 'Body' }
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

    const div = document.createElement('div')
    Object.entries(data).slice(1).forEach(([a, v]) => {
        const info = document.createElement('p');
        info.setAttribute('class', a)
        info.textContent = v

        div.appendChild(info)
    })
    const exit = document.createElement('a')
    exit.textContent = 'X'
    exit.setAttribute('class', 'exit')
    exit.setAttribute('href', '#')

    div.appendChild(exit);
    main.appendChild(div);
    // modalHeader.textContent = `${book.title} - ${book.yearOfPublication}`;
    // const authorLink = createItemLink(book.author);
    // const abstract = document.createElement('p');
    // abstract.textContent = book.abstract;
    // const deleteBtn = document.createElement('button');
    // deleteBtn.textContent = 'Delete Book';
    // deleteBtn.onclick = () => deleteBook(book.id);
    // modalContent.appendChild(authorLink);
    // modalContent.appendChild(abstract);
    // modalContent.appendChild(deleteBtn);
    // modalExit.href = `#books`;
}

