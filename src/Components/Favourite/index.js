import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function Favourite(prop) {
  return (
    <FontAwesomeIcon icon={faStar} size="xs" color="yellow"/>
  );
}
