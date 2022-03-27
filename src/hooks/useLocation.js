import { useState } from 'react';

export const useLocation = () => {
  const [locationSlug] = useState(window.location.hash.substring(1));
  return locationSlug;
};
