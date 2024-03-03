import type { RawRouter } from "@/router";
import _ from "lodash";

type MenuItem = {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  };
}

export const router2menu: (router: RawRouter[]) => MenuItem[] | undefined = (
  router
) => {
  const temp = router
    .map((item) => {
      const data = item.loader && item.loader();
      if (data && data.menu)
        return getItem(
          data.title,
          item.path,
          data.icon,
          item.children && router2menu(item.children)
        );
    })
    .filter((item) => item) as MenuItem[];
  return temp.length > 0 ? temp : undefined;
};

const concatPathHelper = (router: RawRouter[], prefix = "") => {
  for (const item of router) {
    if (item.path === "/") {
      if (!item.children) return;
      concatPathHelper(item.children);
    } else {
      item.path = prefix + "/" + item.path;
      if (item.children) concatPathHelper(item.children, item.path);
    }
  }
};

export const concatPath = (router: RawRouter[]) => {
  const copy = _.cloneDeep(router);
  concatPathHelper(copy);
  return copy;
};
