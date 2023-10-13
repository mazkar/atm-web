const ColorBarChart = (n) => {
    console.log('colors random N',n)
    var colors = []
    if (n) {
        for (var i = 0; i<n ; i++){
            const hexString = Math.floor(Math.random()*16777215).toString(16);
            let color = `#${hexString}`
            colors.push(color)
            console.log('colors random',color)
        }
    }
    return colors
}

export default ColorBarChart