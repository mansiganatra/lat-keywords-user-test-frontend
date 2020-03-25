import { useLocation } from 'react-router-dom';

export default function useQuery(): any {
  return new URLSearchParams(useLocation().search);
}
