
let price = undefined
let neww = undefined
let old_price = undefined

document.getElementById('price').innerHTML= '<p></p>'

chrome.storage.local.get("price", function(data) {
    if(typeof data.price == "undefined") {
        price = 'this site is unsuported'
    } else {
        price = data.price
    }
        
    chrome.storage.local.get("new", function(data) {
        if(typeof data.new == "undefined") {
            neww = 'this site is unsuported'
        } else {
            neww = data.new
        }
            
        chrome.storage.local.get("old_price", function(data) {
            if(typeof data.old_price == "undefined") {
                old_price = 'this site is unsuported'
            } else {
                old_price = data.old_price
            }
            
            pret_id = price.indexOf('Pret')
            ron_id = 150
            document.getElementById('price').innerHTML= "<p>" + price.substr(pret_id, ron_id) + "</p>" +
                                                          "<p>" + ' New price: ' + neww + "</p>" +
                                                          "<p>" +  'old price: ' + old_price.substr(pret_id, ron_id) + "</p>"
            
        });
        
    });
    
});



