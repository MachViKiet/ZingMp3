function playlist(config,
    script = {
        container: "container",
        followers: "followers",
        name: "name",
        type: "type"
    },
    field) {

    $ = document.querySelector.bind(document)
    $$ = document.querySelectorAll.bind(document)


    // console.log(field)
    // render playlist to html
    music_container = $(field.music_container)

    // console.log(music_container)

    config[script.container].forEach((playlists) => {
            // console.log(playlists)
    })


}