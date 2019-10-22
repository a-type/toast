import { useRouter } from 'next/router';

export type PathConfig = {
  path: string;
  exact?: boolean;
};

export default (paths: PathConfig[]) => {
  const router = useRouter();
  const activeIndex = paths.findIndex(pathConfig =>
    pathConfig.exact
      ? router.pathname === pathConfig.path
      : router.pathname.startsWith(pathConfig.path),
  );

  const onChange = (ev: any, index: number) => {
    console.log('goto', index, paths[index].path);
    router.push(paths[index].path);
  };

  return {
    index: activeIndex,
    onChange,
  };
};
