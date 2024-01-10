export default function getRandomColor(){
    const colors = ['rgb(69, 69, 238)', 'rgb(242, 72, 97)', 'rgb(172, 58, 198)', 'rgb(41, 155, 104)', 'rgb(187, 114, 37)']
    const number = Math.floor(Math.random() * colors.length)
    return colors[number]
}