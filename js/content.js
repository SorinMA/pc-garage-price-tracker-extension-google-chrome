// preiau contentul din body
let site = String(document.getElementsByTagName("BODY")[0].outerHTML)

function extractContent_html(s) {
    // extrage textul din pagina
    let span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
}

let price = String(extractContent_html(site))
let index_of_In_Rate = price.indexOf('In rate:') // iau pretul produselor ce pot fi laute in rate

let price_final = price.substring(index_of_In_Rate-26,index_of_In_Rate-5)

// load old data
let old_price = undefined

function new_price_update() { // trimite ce sa printeze popupul si seteaza noile modificari in dict. (stocare)
    if (old_price != price_final && price_final != 'no price') { // sunt modificari
        chrome.storage.sync.set({[String(window.location.href)] : price_final})
        console.log(old_price, price_final)
        chrome.storage.local.set({price: price_final, new:'YES', old_price:old_price})
        console.log('YES')
        if (old_price != 'no old price')
            alert('Price change!')
    } else {
        chrome.storage.local.set({price: price_final, new:'NO', old_price:old_price})
        console.log('NO')
    }
}
if (price_final.includes('RON')) { // daca pretul nou e ok
    chrome.storage.sync.get([String(window.location.href)], function(data) { // preluam din stocare datele vechi
        if(typeof data[String(window.location.href)] == "undefined") {
            console.log('no old price')
            old_price = 'no old price'
            new_price_update()
        } else {
            console.log(data[String(window.location.href)])
            old_price = data[String(window.location.href)]
            new_price_update()
        }
    });
} else {
    price_final = 'no price'
    old_price = 'no old price'
    new_price_update()
}

// compare with the new data

