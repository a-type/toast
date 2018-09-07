export default (data, host) => {
  const frame = document.createElement('iframe');
  frame.src = host + '/recipes/link?mode=postMessage';
  frame.style.position = 'fixed';
  frame.style.width = '30vw';
  frame.style.height = '30vh';
  frame.style.right = '10px';
  frame.style.top = '10px';
  frame.frameBorder = 'none';
  frame.style.border = '1px solid gray';
  frame.style.boxShadow = '0 5px 8px 0 #00000080';
  frame.style.background = 'white';

  document.body.append(frame);

  frame.addEventListener('load', () => {
    frame.contentWindow.postMessage({
      type: 'recipeData',
      data,
    }, host);
  });
};
