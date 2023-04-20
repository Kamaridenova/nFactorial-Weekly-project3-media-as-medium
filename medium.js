//  respJson.results.splice(0,3).forEach((item) => {
//  let newArticle = article.replace('id = "authorName">', `id = "authorName">${item.byline}`);
        // id = "topicsName">
        // newArticle = newArticle.replace('id = "topicsName">', `id = "topicsName">${item.des_facet[0]}`);
        // let now = new Date(`${item.published_date}`);
        // let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        //  now = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
        // newArticle = newArticle.replace('id = "date">', `id = "date">${now}`);
        // newArticle = newArticle.replace('id = "id">', `id = "id">${item}`);
        // newArticle = newArticle.replace('class = "title">', `class = "title">${item.title}`);
        // newArticle = newArticle.replace('id = "body">', `id = "body">${item.abstract}`);
        // newArticle = newArticle.replace('src = ""', `src = "${item.multimedia[0].url}"`);
        // https://api.nytimes.com/svc/topstories/v2/books.json?api-key=gD9IU2QvCP1RIM33ArbttgsdVz8WnPkl
async function getArticlesNYT(){
    const response = await fetch('https://api.nytimes.com/svc/topstories/v2/t-magazine.json?api-key=gD9IU2QvCP1RIM33ArbttgsdVz8WnPkl')
    if(!response.ok && response.status ==='404'){
        console.log("запрос неправильный!")
    }
    const respJson = await response.json();
    console.log(response)
    console.log(respJson.results.splice(0,3));
        const container = document.getElementById("container");
        const articles = document.getElementById("articles");
        let firstContainer = ``;
        let elems = ``;
    for(let i=0; i<respJson.results.splice(0,3).length; i++){
        let now = new Date(`${respJson.results[i].published_date}`);
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
         now = now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
       
        let newArticle =  `</div>
        <div class = "mainCol">
            <div class="main">
                    <div class = "part">
                        <div class="author">
                            <img class = "height: 24px" src="./assets/auth.png">
                            <p id = "authorName">${respJson.results[i].byline}</p>
                            <p class="text-muted">in</p>
                            <p id = "topicsName">${respJson.results[i].des_facet[0]}  - </p>
                            <p class="text-muted" id = "date">${now}</p>
                        </div>
                        <div class = "text">
                        <h1 id = "id-${[i]}" style = "font-size: 180%" class = "title">${respJson.results[i].title}</h1>
                            <p style = "font-size: 120%" id = "body">${respJson.results[i].abstract}</p>
                        </div>
                        <div class = "btnTextBoxes">
                            <div class="btnText">
                                <button class="radius: 100px ">Java Script</button>
                                <p>12 min read - Selected for you</p>               
                            </div>
                            <img class = "padding-left: 40px" src="./assets/Actions.png">
                        </div>
                    </div>
                    <div id = "img">
                        <img src = "${respJson.results[i].multimedia[0].url}" style = "width: 100%" alt = "article_img"></>
                    </div>
                </div>
                    <div>
                        <hr class="hr_line">
                    </div>
         </div>`;      
         elems  += newArticle;
        articles.innerHTML += newArticle;
    };
    firstContainer = `<div id = "articles">${elems}</div> `
    
    let idPosition = 0;
    container.addEventListener("click", (e) => {
        if(e.target.classList.contains("title")){
            console.log(e.target.classList.contains("title"));
            idPosition = +(e.target.id).slice(3);
            // console.log(e.target.id);
            // console.log(idPosition);
            // console.log(respJson.results);
            let nowDate = new Date(`${respJson.results[idPosition].published_date}`);
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            nowDate = nowDate.getDate() + ' ' + months[nowDate.getMonth()] + ' ' + nowDate.getFullYear();
            let secondContainer = 
        `<div class="headerArt"> 
            <button class = "arrowLeft"><img src="./assets/Left.png"></button>
            <div class = "authorArt">
                <div class="authorImgArt">
                    <img style="align-items: center;" src="./assets/auth1.png">
                    <div class="textAuthArt">
                        <p>${respJson.results[idPosition].byline}Authors Name</p>
                        <p>${nowDate} - 12 min read - Member-only</p>
                    </div>
                </div>
                <div class="socialArt">
                    <img style = "padding-right: 10px" src="./assets/LinkedIn.png">
                    <img style = "padding-right: 10px" src="./assets/Facebook Circled.png">
                    <img src="./assets/Twitter.png">
                </div>
            </div>
            <div class="bigImgArt">
                <h2>${respJson.results[idPosition].title}</h2>
                <p>${respJson.results[idPosition].abstract}</p>
                <img src="${respJson.results[idPosition].multimedia[0].url}">
                <h1 style="margin-top: 70px;">${respJson.results[idPosition].title}</h1>
                <div>
                    <p>${respJson.results[idPosition].abstract}</p>
                </div>
                <div class="socialImgArt">
                    <div class="socialsArt">
                        <img src="./assets/Heart.png" alt = "social_img">
                        <p class="padding-right: 7px">180</p>
                        <img class="padding-left: 5px;;" src="./assets/Speech Bubble.png" alt = "social_img">
                        <p>12</p>  
                    </div>
                    <img style="width: 18px" src="./assets/Bookmark.png" alt = "social_img">
                </div>
            </div>
        </div>`;
        // console.log(respJson.results);
        articles.innerHTML = secondContainer;
        } else if(e.target.classList.contains("arrowLeft")){
            articles.innerHTML = firstContainer;
        }
        });
    }
    getArticlesNYT();