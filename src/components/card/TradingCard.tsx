import * as React from "react";
import { cn } from "../../utils/cn";

export interface TradingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The image URL to display in the card
   */
  imageUrl: string;
  
  /**
   * The title of the card
   */
  title: string;
  
  /**
   * The subtitle or type of the card
   */
  subtitle?: string;
  
  /**
   * The main attribute value (like HP in Pokémon cards)
   */
  attributeValue?: string | number;
  
  /**
   * The attribute label (like "HP")
   */
  attributeLabel?: string;
  
  /**
   * The main content or description
   */
  description?: string;
  
  /**
   * Optional footer text
   */
  footer?: string;
  
  /**
   * Card border color
   */
  borderColor?: string;
  
  /**
   * Card background color
   */
  backgroundColor?: string;
  
  /**
   * Whether to enable 3D perspective effect
   */
  enable3D?: boolean;
  
  /**
   * Maximum rotation angle in degrees
   */
  maxRotation?: number;
  
  /**
   * Glare effect intensity (0-1)
   */
  glareIntensity?: number;
}

export const TradingCard = React.forwardRef<HTMLDivElement, TradingCardProps>(
  ({ 
    className, 
    imageUrl, 
    title, 
    subtitle, 
    attributeValue, 
    attributeLabel,
    description, 
    footer,
    borderColor = "#4299e1", // Default blue color
    backgroundColor = "#ebf8ff", // Light blue background
    enable3D = true,
    maxRotation = 10,
    glareIntensity = 0.25,
    children,
    ...props 
  }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const glareRef = React.useRef<HTMLDivElement>(null);
    
    // State to track if the card is being touched/clicked
    const [isActive, setIsActive] = React.useState(false);
    
    // Handle mouse/touch movement for 3D effect
    const handleMovement = React.useCallback(
      (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
        if (!enable3D || !cardRef.current) return;
        
        // Get card dimensions and position
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const cardCenterX = rect.left + cardWidth / 2;
        const cardCenterY = rect.top + cardHeight / 2;
        
        // Get cursor/touch position
        let clientX: number, clientY: number;
        
        if ('touches' in e) {
          // Touch event
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          // Mouse event
          clientX = (e as MouseEvent).clientX;
          clientY = (e as MouseEvent).clientY;
        }
        
        // Calculate rotation based on cursor position relative to card center
        const rotateY = ((clientX - cardCenterX) / (cardWidth / 2)) * maxRotation;
        const rotateX = -((clientY - cardCenterY) / (cardHeight / 2)) * maxRotation;
        
        // Apply rotation transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        // Update glare effect if enabled
        if (glareRef.current && glareIntensity > 0) {
          const glareX = ((clientX - cardCenterX) / cardWidth) * 100 + 50;
          const glareY = ((clientY - cardCenterY) / cardHeight) * 100 + 50;
          
          glareRef.current.style.background = `radial-gradient(
            circle at ${glareX}% ${glareY}%, 
            rgba(255, 255, 255, ${glareIntensity}), 
            transparent 50%
          )`;
        }
      },
      [enable3D, maxRotation, glareIntensity]
    );
    
    // Reset card position when mouse leaves or touch ends
    const resetCardPosition = React.useCallback(() => {
      if (!enable3D || !cardRef.current) return;
      
      setIsActive(false);
      
      // Smoothly animate back to original position
      cardRef.current.style.transition = 'transform 0.5s ease-out';
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      
      // Reset glare effect
      if (glareRef.current) {
        glareRef.current.style.background = 'transparent';
      }
      
      // Remove transition after animation completes
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.transition = '';
        }
      }, 500);
    }, [enable3D]);
    
    // Set up event listeners
    React.useEffect(() => {
      if (!enable3D) return;
      
      const card = cardRef.current;
      if (!card) return;
      
      // Mouse events
      const handleMouseMove = (e: MouseEvent) => handleMovement(e);
      const handleMouseLeave = () => resetCardPosition();
      const handleMouseDown = () => setIsActive(true);
      const handleMouseUp = () => setIsActive(false);
      
      // Touch events
      const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        handleMovement(e);
      };
      const handleTouchEnd = () => resetCardPosition();
      const handleTouchStart = () => setIsActive(true);
      
      // Add event listeners
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      card.addEventListener('mousedown', handleMouseDown);
      card.addEventListener('mouseup', handleMouseUp);
      card.addEventListener('touchmove', handleTouchMove, { passive: false });
      card.addEventListener('touchend', handleTouchEnd);
      card.addEventListener('touchstart', handleTouchStart);
      
      // Clean up
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
        card.removeEventListener('mousedown', handleMouseDown);
        card.removeEventListener('mouseup', handleMouseUp);
        card.removeEventListener('touchmove', handleTouchMove);
        card.removeEventListener('touchend', handleTouchEnd);
        card.removeEventListener('touchstart', handleTouchStart);
      };
    }, [enable3D, handleMovement, resetCardPosition]);
    
    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "relative rounded-xl overflow-hidden",
          "w-72 h-[400px]", // Default size similar to trading cards
          "transition-shadow duration-300",
          "select-none", // Prevent text selection during drag
          isActive ? "cursor-grabbing" : "cursor-grab",
          className
        )}
        style={{
          backgroundColor: backgroundColor,
          boxShadow: `0 10px 30px -5px rgba(0, 0, 0, 0.3)`,
          border: `8px solid ${borderColor}`,
          transformStyle: 'preserve-3d',
        }}
        {...props}
      >
        {/* Glare effect overlay */}
        <div 
          ref={glareRef}
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ 
            borderRadius: 'inherit',
          }}
        />
        
        {/* Card header with title and attribute */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200 bg-white/90">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          </div>
          {attributeValue && (
            <div className="flex items-center">
              <span className="font-bold text-xl">{attributeValue}</span>
              {attributeLabel && <span className="text-xs ml-1">{attributeLabel}</span>}
            </div>
          )}
        </div>
        
        {/* Card image */}
        <div 
          className="h-40 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${imageUrl})`,
            transform: 'translateZ(20px)', // 3D effect for the image
            transformStyle: 'preserve-3d',
          }}
        />
        
        {/* Card content */}
        <div className="p-4 bg-white/90">
          {description && (
            <p className="text-sm">{description}</p>
          )}
          {children}
        </div>
        
        {/* Card footer */}
        {footer && (
          <div className="absolute bottom-0 left-0 right-0 p-2 text-xs text-center bg-gray-100 border-t border-gray-200">
            {footer}
          </div>
        )}
      </div>
    );
  }
);

TradingCard.displayName = "TradingCard"; 