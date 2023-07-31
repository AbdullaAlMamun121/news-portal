
let fetchAllNews = [];

const fetchAllCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url).then(res => res.json()).then(data => {
       
        showAllCategories(data.data.news_category);
    });

}
const showAllCategories = categories => {
    // console.log(categories);

    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const { category_id, category_name } = category;
        // console.log(category_name);
        // <a class="nav-link" href="#">Link</a>
        // console.log(category_id,category_name);
        // categoriesContainer.innerHTML += `<a class="nav-link" href="#">${category_name}</a>`; 

        const linkPera = document.createElement('p');
        linkPera.innerHTML = `<a onclick="getLinkData('${category_id}','${category_name}')" class="nav-link" href="#">${category_name}</a>`;
        categoriesContainer.appendChild(linkPera);

    })
}



const getLinkData = (category_id, category_name) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    console.log(url);
    fetch(url).then(res => res.json()).then(data => {
        fetchAllNews = data.data;
        displayLinkData(data.data, category_name)
    });
    // console.log(category_id);

}


const displayLinkData = (newsList, category_name) => {
    const newsCardContainer = document.getElementById('news-card-container');
    // console.log(newsList);
    // set news count
    document.getElementById('news-number').innerText = newsList.length;
    // set news name
    document.getElementById('news-types').innerText = category_name;
    newsCardContainer.innerHTML = '';
    newsList.forEach(news => {
        console.log(news);
        const { image_url, details, title, _id, total_view, author } = news;
        newsCardContainer.innerHTML += `
        <div class="card mb-3 container p-4">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.slice(0, 200)}...</p>
            </div>
            <div class="d-flex justify-content-between card-footer border-0 bg-body">
              <div class="d-flex gap-2">
                <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">
                <div>
                <p class="m-0 p-0">${author.name ? author.name:"Not provided"}</p>
                <p class="m-0 p-0">${author.published_date}</p>
                </div>
              </div>
              <div class="d-flex align-items-center gap-2">
               <i class="fas fa-eye"></i>
               <p class="m-0 p-0">${total_view ? total_view : "Not available"}</p>
              </div>
              <div class="d-flex align-items-center gap-1">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              </div>
              <div class="d-flex align-items-center gap-1">
               <i class="fas fa-arrow-right" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="fetchNewsDetail('${_id}')"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    })

}

const fetchNewsDetail = news_id => {
    //  console.log(news_id)
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url).then(res => res.json()).then(data => showNewsDetail(data.data[0]));
}
const showNewsDetail = newDetails => {
    console.log(newDetails);
    const { image_url, details, title, _id, total_view, author,others_info } = newDetails;
    const cardBody = document.getElementById('modal-body');
    // modal title
    document.getElementById('modal-title').innerText = `${title}`
    cardBody.innerHTML = `
        <div class="card mb-3 container p-4">
        <div class="row g-0">
          <div class="col-md-12">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-12 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending ? "It's trending":"Old news"}</span></h5>
              <p class="card-text">${details}</p>
            </div>
            <div class="d-flex justify-content-between card-footer border-0 bg-body">
              <div class="d-flex gap-2">
                <img src="${author.img}" class="img-fluid rounded-circle" alt="..." height="40" width="40">
                <div>
                <p class="m-0 p-0">${author.name}</p>
                <p class="m-0 p-0">${author.published_date}</p>
                </div>
              </div>
              <div class="d-flex align-items-center gap-2">
               <i class="fas fa-eye"></i>
               <p class="m-0 p-0">${total_view}</p>
              </div>
              <div class="d-flex align-items-center gap-1">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
}

// todays pick
const showTodaysPick = () => { 
    const todayPick = fetchAllNews.filter(singlePick => singlePick.others_info.is_todays_pick === true);
    const newsType = document.getElementById('news-types').innerText;
    displayLinkData(todayPick,newsType);

}
// trending
const showTrending = () => {
    let trendingNews = fetchAllNews.filter(singleData => singleData.others_info.is_trending === true);

    console.log(trendingNews);
    const newsType = document.getElementById('news-types').innerText;

    displayLinkData(trendingNews,newsType);
}


