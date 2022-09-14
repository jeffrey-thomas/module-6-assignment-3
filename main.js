const regex = /images\/(?<id>[0-9]+).(png|jpg)/

let thumbnails = document.getElementsByClassName('thumbnail');
let activeThumbnail = 0;
thumbnails[activeThumbnail].classList.add('active');

let artworks = Array(thumbnails.length);

let info = {
    "image":document.getElementById('info-image'),
    "title":document.getElementById('info-title'),
    "artist":document.getElementById('info-artist'),
    "dimensions":document.getElementById('info-dimensions'),
    "medium":document.getElementById('info-medium'),
    "origin":document.getElementById('info-origin'),
    "period":document.getElementById('info-period')
}

//Initialize
//register even listeners and create artwork id list
for(let i=0; i<thumbnails.length; i++){
    thumbnails[i].addEventListener('click',()=>{selectArtwork(i)});
    artworks[i] = thumbnails[i].src.match(regex).groups.id
}

async function selectArtwork(index){
    thumbnails[activeThumbnail].classList.remove('active');
    thumbnails[index].classList.add('active');
    activeThumbnail = index;
    let data = await getDetails(artworks[index]);
    updateInfoPanel(data);
}


async function getDetails(id){
    let response = await fetch('https://api.artic.edu/api/v1/artworks/'+id+'?fields=title,artist_display,date_start,date_end,place_of_origin,medium_display,dimensions');
    let json = await response.json();
    let data = json['data'];
    console.log(data);
    return data;
}

function updateInfoPanel(data){
    info.image.src = "/images/" + artworks[activeThumbnail]+".jpg";
    info.title.innerText = data.title;
    info.artist.innerText = data.artist_display;
    info.dimensions.innerText = data.dimensions;
    info.medium.innerText = data.medium_display;
    info.origin.innerText = data.place_of_origin;
    if(data.date_start == data.date_end)
        info.period.innerText = data.date_start;
    else
        info.period.innerText = data.date_start + " - " + data.date_end;
}

selectArtwork(0);