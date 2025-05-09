import React from 'react';
import { IconType } from 'react-icons';
import './styles/IconWrapper.css';

interface IconWrapperProps {
  icon: IconType;
  size?: number;
  color?: string;
  className?: string;
}

/**
 * A wrapper component for icons that handles theme-based coloring
 */
const IconWrapper: React.FC<IconWrapperProps> = ({ 
  icon: Icon, 
  size = 16, 
  color = 'currentColor',
  className = ''
}) => {
  return (
    <span className={`icon-wrapper ${className}`}>
      <Icon size={size} color={color} />
    </span>
  );
};

export default IconWrapper; 