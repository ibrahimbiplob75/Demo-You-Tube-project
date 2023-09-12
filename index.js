// Define an empty array to store view counts
const numbers = [];
let data;

const loadCategory = async (id) => {
  const url = `https://openapi.programming-hero.com/api/videos/categories`;
  const res = await fetch(url);
  const response = await res.json();
  data = response.data; 
  showCategory(data);
  

};


function showCategory(data) {
  const Category_list = document.getElementById('category_btn');
  data.forEach(function (item) {
    const JS_div = document.createElement('div');
    JS_div.classList = `p-3`;

    JS_div.innerHTML = `
                <div class="card-actions justify-start mt-4 mb-3 ">
                
                    <button id="category_id"  onclick="category_id('${item.category_id}')" class="btn bbtn-outline w-32">${item.category}</button>
                </div>
        
        `;

    Category_list.appendChild(JS_div);
  });

  loadVideos(); 
}

// Category Id on click from button
function category_id(categoryId) {
  loadVideos(categoryId);
}

const loadVideos = async (Id) => {
  const url = `https://openapi.programming-hero.com/api/videos/category/${Id}`;
  const res = await fetch(url);
  const data = await res.json();
  const videos = data.data;
 

  
  numbers.length = 0; 
  videos.forEach((element) => {
    const array = element.others.views;
    numbers.push(array);
  });

  display_vides(videos);
 
}




function display_vides(data) {
  let Length2 = data.length;
  

  if (Length2 > 0) {
    var videoContainer = document.getElementById('video-container');
    videoContainer.innerText = '';

    // Sort the videos based on view counts
    const sortedVideos = data.sort(
      (a, b) => parseFloat(b.others.views) - parseFloat(a.others.views)
    );

    sortedVideos.forEach((element) => {
      const JS_div = document.createElement('div');
      JS_div.classList = `w-84 bg-base-100 p-2 mt-6 mb-4 rounded-sm`;

      JS_div.innerHTML = `
            <figure><img class="h-48 w-full rounded-lg" src="${element.thumbnail}" alt="Shoes" /></figure>
                <div class="card-body">
                    <div class="flex flex-row">
                        <figure><img class="w-10 h-10 rounded-full" src="${element.authors[0].profile_picture}" alt="videos" /></figure>
                        <h2 class="card-title pl-5">${element.title}</h2>
                    </div>
                    <div class="flex flex-row justify-start">
                        <p>${element.authors[0].profile_name}</p>
                        
                        ${
                          element.authors[0].verified
                            ? '<img class="w-6" src="image/verified.png"></img>'
                            : ''
                        }
                        
                        
                    </div>
                    <div class="card-actions justify-end">
                        <div class="badge badge-outline">${element.others.views} Views</div> 
                    </div>
                </div>
            
            `;

      videoContainer.appendChild(JS_div);
    });
  } else {
    var videoContainer = document.getElementById('video-container');
    videoContainer.innerText = '';

    const JS_div = document.createElement('div');
    JS_div.classList = `rounded-sm`;

    JS_div.innerHTML = `
                <div class="flex justify-center items-center text-center mt-20">
                    <figure class="text-center">
                        <img class="rounded-lg mt-auto" src="image/Icon.png" alt="Shoes" />
                    </figure>
                   
                </div>
                 <h2 class="text-4xl text-center mt-6">Oops!! Sorry, There is no content here</h2>
                
            `;

    videoContainer.appendChild(JS_div);
  }

  loader(false);
}





// Loading functional implementation
const loader = (isLoading) => {
  const loaderId = document.getElementById('loading-spinner');
  if (isLoading) {
    loaderId.classList.remove('hidden');
  } else {
    loaderId.classList.add('hidden');
  }
};


loadCategory();
