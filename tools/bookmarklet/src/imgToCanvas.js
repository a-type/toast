export default (img) => {
  var canvas = document.createElement('canvas')

  canvas.width = img.width
  canvas.height = img.height

  // copy the image contents to the canvas
  var context = canvas.getContext('2d')
  context.drawImage(
    img,
    0, 0,
    img.width, img.height,
    0, 0,
    img.width, img.height)

  return canvas
}
