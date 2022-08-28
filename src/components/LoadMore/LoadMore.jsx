import { Loadmore } from './LoadMore.styled';

export const ButtonLoadMore = ({ onClick }) => {
  return <Loadmore onClick={() => onClick()}>Load More</Loadmore>;
};
