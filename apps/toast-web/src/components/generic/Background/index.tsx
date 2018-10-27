import BaseBackground from './Background';
import Manager from './Manager';
import context from './context';

type BackgroundWithComponents = typeof BaseBackground & {
  Manager?: typeof Manager;
  Consumer?: typeof context.Consumer;
};

const Background: BackgroundWithComponents = BaseBackground;

Background.Manager = Manager;
Background.Consumer = context.Consumer;

export default Background;
