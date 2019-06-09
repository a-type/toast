import useRouter from 'use-react-router';

export type PathConfig = {
  path: string;
  exact?: boolean;
};

export default (paths: PathConfig[]) => {
  const { history, location } = useRouter();
  const activeIndex = paths.findIndex(pathConfig =>
    pathConfig.exact
      ? location.pathname === pathConfig.path
      : location.pathname.startsWith(pathConfig.path),
  );

  const onChange = (ev: any, index: number) => {
    console.log('goto', index, paths[index].path);
    history.push(paths[index].path);
  };

  return {
    index: activeIndex,
    onChange,
  };
};
