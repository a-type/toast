export default (data, origin) => {
  const frame = document.createElement('iframe');
  frame.src = origin + '/recipes/link?mode=postMessage';
  frame.style.position = 'fixed';
  frame.style.width = '400px';
  frame.style.height = '400px';
  frame.style.maxWidth = '100%';
  frame.style.right = '10px';
  frame.style.top = '10px';
  frame.frameBorder = 'none';
  frame.style.border = '1px solid gray';
  frame.style.boxShadow = '0 5px 8px 0 #00000020';
  frame.style.background = 'white';
  frame.style.zIndex = 100000;

  document.body.append(frame);

  frame.addEventListener('load', () => {
    frame.contentWindow.postMessage(
      {
        type: 'recipeData',
        data,
      },
      origin,
    );
  });
};
