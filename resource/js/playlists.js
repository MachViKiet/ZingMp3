function openPlayer(id) {
    event.preventDefault()

    console.log(id)
    var field = $(".player-field")

    field.innerHTML = ""

    card_inf = {
        image: id.querySelector('.card-img').style.background,
        name: id.querySelector('.card-title').innerHTML,
        singer: id.querySelector('.card-desc').innerHTML,
        audio: id.querySelector('.card-title').href
    }

    field.innerHTML += `
    <div class="container row">
    <div class="close-btn">
    <i class="fa-solid fa-xmark"></i>
</div>
                <div class="col l-1 m-1 s-0">
                    <div class="player-image"  style = '
                    background: ${card_inf.image};
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                    ' ></div>
                </div>
                <div class="col l-2 m-2 s-3">
                    <div class="player-inf">
                        <h1 title= "${card_inf.name}">${card_inf.name}</h1>
                        <p title="${card_inf.name}">${card_inf.singer}</p>
                    </div>
                </div>
                <div class="col l-9  m-9  s-9">
                    <div class="player-control">
                        <div class="player-set">
                            <button><i class="fa-solid fa-backward"></i></button>
                            <button class="play_btn" onclick="myFunction()">
                                <i class="fa-solid fa-play" hidden></i>
                            </button>
                            <audio id="Myaudio" src = '${card_inf.audio}' style="display:none"></audio>
                            <button><i class="fa-solid fa-forward"></i></button>
                        </div>
                        <div class="player-thumb">
                            <p>00:12</p>
                            <input type="range" name="" id="">
                        </div>
                    </div>
                </div>

            </div>
    `
    $('.close-btn').onclick = ()=>{
        field.innerHTML = ""
    }

    return 0;
}

function playlist(config, field) {

    $ = document.querySelector.bind(document)
    $$ = document.querySelectorAll.bind(document)


    // console.log(field)
    // render playlist to html


    var container = $(field.card_field)
    container.innerHTML = ''

    var count = 0
    config['container'].forEach((playlist) => {
        if (playlist["type"] === "playlist") {
            container.innerHTML += `<div class="field-block field-block_js">
            <h2 class="block-title block-title_js">${playlist["name"]}</h2>
            <div class="card-container card-container_js">

            </div>
            </div> `

            card_container = $$(field.card_container)[count]
            card_container.innerHTML = ''
            playlist["container"].forEach((music) => {
                card_inf = {
                    field: field.player_field,
                    image: music["url"]["image"],
                    audio: music["url"]["audio"],
                    name: music["name"],
                    singer: music["singer"]
                }

                card_container.innerHTML += `
                <button title = "${card_inf.name} - ${card_inf.singer}" class="card card_js"  "  onclick = "openPlayer(this)">
                <div class="card-img image image-s-3 card-img_js
                "style = 'background: url(${card_inf.image});
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;' ></div>
                <a href="${card_inf.audio}" class="card-title card-title_js">${card_inf.name}</a>
                <p class="card-desc card-desc_js">${card_inf.singer}</p>
            </button>
                `

            })

            count = count + 1;
        }
    })

}