
const apiKey    = 'fc4b1248c3964b398fa20481f8be3831';
const main      = document.querySelector( 'main' );
const sourceSelector    = document.querySelector( '#sourceSelector' );
const defaultSource = 'the-next-web';

window.addEventListener( 'load', async e => {

    updateNews();
    await updateSources();

    sourceSelector.value    = defaultSource;

    sourceSelector.addEventListener( 'change', e => {
        updateNews( e.target.value );
    })

    if( 'serviceWorker' in navigator ) {
        try {
            navigator.serviceWorker.register( 'sw.js' );
            console.log( '.. SW workin' );
        } catch ( err ) {
            console.log( 'BOOM' );
        }
    }

})

async function updateSources() {
    const res   = await fetch( 'https://newsapi.org/v1/sources' );
    const json  = await res.json();

    const sourceOptions = json.sources.map(src => {
        return `<option value="${src.id}">${src.name}</option>`
    });

    sourceSelector.innerHTML    = sourceOptions.join( '\n' );
}

async function updateNews( source = defaultSource ) {
    const res   = await fetch( `https://newsapi.org/v1/articles?source=${source}&apiKey=${apiKey}` );
    const json  = await res.json();

    main.innerHTML  = json.articles.map ( createArticle ).join( '\n' );
}

function createArticle( article ) {
    return `
    <div class='article'>
        <a href="${ article.url }">
            <h2>${ article.title }</h2>
            <img src="${ article.urlToImage }">
            <p>${ article.description }</p>
        </a>
    </div>`
}