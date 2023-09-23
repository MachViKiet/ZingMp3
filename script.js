$ = document.querySelector.bind(document)
$$ = document.querySelectorAll.bind(document)



function app(config) {
    start = (config) => {
        config.forEach((index) => {
            fetch(index['url'])
                .then((res) => res.json())
                .then((data) => {
                    switch (index['type']) {
                        case 'newsfeed':
                            update_NewsFeed(index['field'], data)
                            break
                        case 'new music':
                            update_NewMusics(index['field'], data)
                            break
                    }
                })
        })
    }

    function update_NewsFeed(id, data) {
        selector = $(id)
        selector.innerHTML = ''

        selector.innerHTML = `
        <a href="#" class=" poster col xl-4 l-6 m-12"> </a>
    <a href="#" class="poster col xl-4 l-6 m-0"></a>
    <a href="#" class="poster col xl-4 l-0 m-0"> </a>
        `

        index = 1
        data['container'].forEach((e) => {
            if (img = selector.querySelector(`a:nth-child(${index})`)) {
                img.innerHTML = `
                <img src="${e['img']}"alt="" >`
            }
            else {
                selector.innerHTML += `
                <a href="#" class="poster col xl-0 l-0 m-0">
                <img src="${e['img']}"  alt=""> </a>`
            }

            index = index + 1
        })

        selector.innerHTML += `<button class=""><i class="fa-solid fa-angle-left"></i></button>
                    <button><i class="fa-solid fa-angle-right"></i></button>`
    }

    function update_NewMusics(id, data) {
        selector = $(id)
        selector.innerHTML = ''

        index = 1
        console.log(data)
        data['container'].forEach((e) => {
            console.log(`${e.url}`)
            selector.innerHTML += `
            <div class="col xl-4 l-6 m-12">
            <div class="card-music">
                <div class="card-music__img" 
                style = '
                background: url(${e['url']['image']});
                background-position: center;
                background-size: contain;
                '
                ></div>
                <div class="card-music__inf">
                    <a class="inf-title">${e['name']}</a>
                    <a class="inf-artist">${e['singer']}</a>
                    <div class="inf-desc">Hôm qua</div>
                </div>
                <div class="card-music__emotion">
                    <button onclick="emoji_love(this)"><i class="fa-regular fa-heart"></i></button>
                </div>
            </div>
            <audio src="${e['url']['audio']}"></audio>
            
        </div>
            `

            index = index + 1
        })

        $$('.card-music').forEach((btn) => {
            btn.onclick = (e) => {
                audio = ''
                element = e.target
                isclick = false


                while (!element.parentElement.querySelector("audio")) {
                    element = element.parentElement
                }
                element = element.parentElement

                console.log(element)
                isclick = true



                if (isclick) {
                    img = element.querySelector('.card-music__img').style.background
                    songs = element.querySelector('.card-music__inf .inf-title').innerHTML
                    artist = element.querySelector('.card-music__inf .inf-artist').innerHTML
                    audio = element.querySelector('audio').src


                    console.log(audio)

                    $('.player-block').innerHTML = `
                    <div class="card-music">
                    <div class="card-music__img"
                        style = '
                            background : ${img}
                        '
                    >
                    </div>
                    <div class="card-music__inf">
                        <a class="inf-title">${songs}</a>
                        <a class="inf-artist">${artist}</a>
                        
                    </div>

                    <div class="card-music__emotion">
                        <button onclick="emoji_love(this)"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>

                <div class="action">
                <button class="play"><i class="fa-solid fa-pause"></i></button>
                           </div>
    
                <div class="player-control">
                    <div class="btn">
                        <div class="action">
                            <button class="backward"><i class="fa-solid fa-backward"></i></button>
                            <button class="pause"><i class="fa-solid fa-pause"></i></button>
                            <button class="forward"><i class="fa-solid fa-forward"></i></button>
                        </div>
                    </div>
                    <div class="slider-thumb">
                        <p class="time-start">00:00</p>
                        <input type="range">
                        <p class="time-end">03:34</p>
                    </div>
    
                </div>
    
                <div class="icon">
                    <button><i class="fa-solid fa-volume-high"></i></button>
                </div>
    
                <audio src="${audio}"></audio>
                    `

                    $('.player-block').querySelector('audio').play()


                    $$('.player-block .action button').forEach((btn) => {
                        btn.onclick = (a) => {
                            selector = a.target
                            player = a.target
                            while (!selector.matches('button')) {
                                selector = selector.parentElement
                            }
                            while (!player.matches('.player-block')) {
                                player = player.parentElement
                            }

                            type = selector.classList[0]
                            console.log(player)
                            audio = player.querySelector('audio')

                            switch (type) {
                                case 'play':
                                    audio.play()
                                    selector.classList.remove("play")
                                    selector.classList.add("pause")
                                    icon = selector.querySelector('i')
                                    console.log(icon)
                                    icon.classList.remove("fa-play")
                                    icon.classList.add("fa-pause")
                                    break;
                                case 'pause':
                                    audio.pause()
                                    selector.classList.add("play")
                                    selector.classList.remove("pause")
                                    icon = selector.querySelector('i')
                                    icon.classList.add("fa-play")
                                    icon.classList.remove("fa-pause")
                                    break;

                            }
                            console.log(type)
                        }
                    })
                }

            }
        })
    }

    start(config)
}