import React from 'react';
import { H1, P, Link } from 'components/typeset';
import { Button } from 'components/generic';

const linkContent = `javascript:(function (e){var t=document.createElement("script");t.setAttribute("src",e),t.setAttribute("crossorigin","anonymous"),document.body.appendChild(t)}('${
  window.location.origin
}/bookmarklet/toast-bookmarklet.js'));`;

export default () => (
  <div>
    <H1>The Toast Scanner</H1>
    <P>
      Drag this button to your bookmarks toolbar:&nbsp;
      <Link.Clear to={linkContent} forceRemote>
        <Button label="🍽️ Toast Scanner" />
      </Link.Clear>
    </P>
    <P>
      Scanner is a Bookmarklet (kind of like a browser extension) which can
      instantly scan a recipe from a website you're visiting and link it in
      Toast. Once you've linked a recipe with the Scanner, we can analyze the
      ingredients and include it in our search and categorization algorithms.
    </P>
  </div>
);
