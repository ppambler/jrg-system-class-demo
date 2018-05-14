let request = new XMLHttpRequest()
request.open('get','http://jack.com:8002/xxx')
request.send()
request.onreadystatechange = () => {
    if(request.readyState === 4) {
        if(request.status >= 200 && request.status < 300) {
            let string = request.responseText
            let object = window.JSON.parse(string)
        }
    }
}