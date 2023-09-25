function music_app(config) {
    $ = document.querySelector.bind(document)
    $$ = document.querySelectorAll.bind(document)
    start = () => {
        // arr.link
        // arr.type
        config.forEach((arr) => {
            // Đọc dữ liệu từ file. 
            fetch(arr.link)
                .then((res) => res.json())
                .then((data) => {
                    switch (arr.type){
                        case 'poster':
                            poster_Rendering(data)
                            break;
                        
                        case 'music':
                            music_Rendering(data)
                            break
                        case 'album':
                            album_Rendering(data)
                            break
                    }

                    rule()
                })
        })
    }

    function poster_Rendering (data){
        count = 0;
        field = $('.poster-content')
        field.innerHTML = ''
        data['container'].forEach((img)=>{
            poster = document.createElement('img')
            poster.src = img['img']
            field.appendChild(poster)
        })
    }

    function music_Rendering(data){
        header = document.createElement("div")
        header.classList.add('content-title');
        container = document.createElement("div")
        container.classList.add('music-container','mk-row' );
        header.innerHTML = data['title']
        data['container'].forEach((config)=>{
            para = document.createElement("div")
            para.classList.add('card-music','mk-block','mk-col','xxl-4','xl-6')
            para.innerHTML = `
            <div class="card-music_img">
            <div class="img" style = "background : url(${config["url"]['image']}) ; 
                                                    background-position: center;
                                                    background-size: cover;">
                <div class="img-overlay mk-center-block">
                    <i class="fa-solid fa-circle-play btn">
                        <audio src="${config["url"]['audio']}"></audio>
                    </i>
                </div>
            </div>
            </div>
            <div class="card-music-inf">
                <div class="music-inf_name">
                    ${config["name"]}
                </div>
                <div class="music-inf_artists">
                    <a href="#">${config["singer"]}</a>
                </div>
            </div>
            `

            if(config["premium"]){
                para.innerHTML += `
                <div class="premium">
                    ${config["premium"]}
                </div>
                `
            }

            container.appendChild(para)
        })

        $('.content-container').appendChild(header)
        $('.content-container').appendChild(container)   
        
        return container
    }

    function album_Rendering(data){
        console.log(data)
        header = document.createElement("div")
        header.classList.add('content-title');
        container = document.createElement("div")
        container.classList.add('music-container','mk-row' );
        header.innerHTML = data['title']

        data['container'].forEach((config)=>{
            para = document.createElement("div")
            para.classList.add('card-ablum','mk-block','mk-col','xxl-3','xl-4')
            para.innerHTML = `
            <div class="card-music_img">
            <div class="img" style = "background : url(${config['image']}) ; 
                                                    background-position: center;
                                                    background-size: cover;">
                <div class="img-overlay mk-center-block">
                    <i class="fa-solid fa-circle-play btn">
                        <audio src="#"></audio>
                    </i>
                </div>
            </div>
            </div>
            <div class="card-music-inf">
                <div class="music-inf_artists">
                    <a href="#">${config['desc']}</a>
                </div>
            </div>            
                `

            container.appendChild(para)
            // container.querySelector('audio').innerHTML = 
        })

        $('.content-container').appendChild(header)
        $('.content-container').appendChild(container)       
    }

    function rule(){
        $$('.fa-circle-play.btn').forEach((btn) => {
            btn.onclick = () => {

                console.log(btn)
                $$('.img-overlay').forEach((btn2) => {
                    
                    icon = btn2.querySelector('.fa-circle-pause')
                    if (icon && icon != btn) {
                        icon.classList.toggle('fa-circle-play')
                        icon.classList.toggle('fa-circle-pause')
                    }
                    btn2.style.display = 'none'
                })

                parent = btn.parentElement;
                if(parent.querySelector('.fa-circle-play')){
                    parent.style.display = 'flex'
                    btn.classList.toggle('fa-circle-play')
                    btn.classList.toggle('fa-circle-pause')
                }else{
                    parent.style.display = 'flex'
                    btn.classList.toggle('fa-circle-play')
                    btn.classList.toggle('fa-circle-pause')
                }
                //}
            }

            // btn.onmouseover = ()=>{
            //     btn.parentElement.style.display = 'flex !important'
            // }
        })
    }

    start()
}