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

  /**
   * Card variant style - default or full art
   */
  variant?: 'default' | 'fullArt';

  /**
   * Array of traits to display in a grid layout at the bottom of the card
   */
  traits?: { name: string; value: string }[];
  
  /**
   * Border thickness - thin (2px) or thick (8px)
   */
  borderThickness?: 'thin' | 'thick';
  
  /**
   * Image fit style
   * - 'contain': Shows full image without cropping (default)
   * - 'cover': Fills container but may crop
   * - 'scale-down': Scales down to fit, never scales up (prevents stretching)
   */
  imageFit?: 'contain' | 'cover' | 'scale-down';
  
  /**
   * Card size - standard (fixed height) or adaptive (grows with content)
   */
  cardSize?: 'standard' | 'adaptive';
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
    variant = 'default',
    traits = [],
    borderThickness = 'thin',
    imageFit = 'contain',
    cardSize = 'standard',
    children,
    ...props 
  }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const glareRef = React.useRef<HTMLDivElement>(null);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    
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
    
    // Handle mouse/touch start
    const handleStart = React.useCallback(() => {
      setIsActive(true);
    }, []);
    
    // Handle mouse/touch end
    const handleEnd = React.useCallback(() => {
      setIsActive(false);
      
      // Reset card transform
      if (cardRef.current) {
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
      
      // Reset glare effect
      if (glareRef.current) {
        glareRef.current.style.background = 'transparent';
      }
    }, []);
    
    // Add and remove event listeners
    React.useEffect(() => {
      const card = cardRef.current;
      if (!card || !enable3D) return;
      
      // Mouse events
      card.addEventListener('mouseenter', handleStart);
      card.addEventListener('mousemove', handleMovement as any);
      card.addEventListener('mouseleave', handleEnd);
      
      // Touch events
      card.addEventListener('touchstart', handleStart);
      card.addEventListener('touchmove', handleMovement as any);
      card.addEventListener('touchend', handleEnd);
      
      return () => {
        // Cleanup
        card.removeEventListener('mouseenter', handleStart);
        card.removeEventListener('mousemove', handleMovement as any);
        card.removeEventListener('mouseleave', handleEnd);
        
        card.removeEventListener('touchstart', handleStart);
        card.removeEventListener('touchmove', handleMovement as any);
        card.removeEventListener('touchend', handleEnd);
      };
    }, [handleStart, handleMovement, handleEnd, enable3D]);
    
    // Handle image load event
    const handleImageLoad = React.useCallback(() => {
      setImageLoaded(true);
    }, []);
    
    // Get border thickness in pixels
    const borderWidthPx = borderThickness === 'thick' ? '8px' : '2px';
    
    // Determine if we're in dark mode by checking for the .dark class on html
    const isDarkMode = typeof document !== 'undefined' && 
      document.documentElement.classList.contains('dark');
    
    // Handle custom colors in dark mode
    const isCustomBorderColor = borderColor !== "#4299e1";
    const isCustomBackgroundColor = backgroundColor !== "#ebf8ff";
    
    // For custom colors, darken them in dark mode but preserve their hue
    const darkModeBorderColor = isDarkMode 
      ? isCustomBorderColor 
        // If it's a custom color, darken it but preserve the hue
        ? adjustColorForDarkMode(borderColor)
        // Default dark blue for the default border
        : "#1e40af" 
      : borderColor;
    
    // For custom background colors, darken them significantly in dark mode
    const darkModeBackgroundColor = isDarkMode 
      ? isCustomBackgroundColor
        // If it's a custom background, darken it but preserve the hue
        ? adjustColorForDarkMode(backgroundColor, 0.3) // More darkening for backgrounds
        // Default dark blue background
        : "#0f172a" 
      : backgroundColor;
    
    // Helper function to adjust colors for dark mode
    function adjustColorForDarkMode(color: string, darkFactor = 0.6) {
      // Simple color darkening for hex colors
      if (color.startsWith('#')) {
        // Convert hex to RGB
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        // Darken the color
        const darkenedR = Math.floor(r * darkFactor);
        const darkenedG = Math.floor(g * darkFactor);
        const darkenedB = Math.floor(b * darkFactor);
        
        // Convert back to hex
        return `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;
      }
      
      return color;
    }
    
    // Determine text colors based on background darkness
    const isDarkBackground = isDarkMode || isColorDark(backgroundColor);
    
    // Helper function to determine if a color is dark
    function isColorDark(color: string): boolean {
      if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        // Calculate perceived brightness (YIQ formula)
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return yiq < 128; // Less than 128 is considered dark
      }
      
      return false;
    }
    
    // Calculate the number of traits to display based on available space
    // Standard card can fit about 4 traits comfortably
    const maxVisibleTraits = 4;
    const visibleTraits = traits.slice(0, maxVisibleTraits);
    const hasMoreTraits = traits.length > maxVisibleTraits;
    
    return (
      <div
        ref={cardRef}
        className={cn(
          "relative rounded-xl overflow-hidden transition-shadow duration-300",
          "shadow-lg hover:shadow-xl",
          isActive ? "cursor-grabbing" : "cursor-grab",
          className
        )}
        style={{
          width: "300px",
          height: variant === 'fullArt' ? "450px" : "400px",
          backgroundColor: darkModeBackgroundColor,
          border: `${borderWidthPx} solid ${darkModeBorderColor}`,
          transformStyle: "preserve-3d",
          transformOrigin: "center",
        }}
        {...props}
      >
        {/* Glare effect overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ mixBlendMode: "overlay" }}
        />
        
        {variant === 'fullArt' ? (
          // Full Art Layout
          <>
            {/* Card image (full background) */}
            <div className="absolute inset-0 p-2">
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={title}
                  className="rounded-md"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: imageFit,
                    width: imageFit === 'cover' ? '100%' : 'auto',
                    height: imageFit === 'cover' ? '100%' : 'auto',
                  }}
                  onLoad={handleImageLoad}
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-10"></div>
            
            {/* Card content container */}
            <div className="relative z-20 h-full flex flex-col">
              {/* Card header with title and attribute */}
              <div className="mt-auto pt-20 p-4 flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
                  {subtitle && <p className="text-sm opacity-75 mt-1 line-clamp-1">{subtitle}</p>}
                </div>
                
                {attributeValue && attributeLabel && (
                  <div className="flex items-center bg-background/80 p-1 rounded">
                    <span className="font-bold text-lg">{attributeValue}</span>
                    <span className="ml-1 text-xs">{attributeLabel}</span>
                  </div>
                )}
              </div>
              
              {/* Card description */}
              {description && (
                <div className="px-4 py-2 text-sm">
                  <p className="line-clamp-3">{description}</p>
                </div>
              )}
              
              {/* Traits section */}
              {traits.length > 0 && (
                <div className="p-4 mt-auto">
                  <div className="grid grid-cols-2 gap-3">
                    {visibleTraits.map((trait, i) => (
                      <div key={i} className="flex flex-col bg-background/80 p-2 rounded">
                        <span className="text-xs font-medium opacity-75 truncate">
                          {trait.name}
                        </span>
                        <span className="text-sm font-semibold mt-1 truncate">
                          {trait.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {hasMoreTraits && (
                    <div className="mt-2 text-xs text-center opacity-75">
                      +{traits.length - maxVisibleTraits} more properties
                    </div>
                  )}
                </div>
              )}
              
              {/* Card footer */}
              {footer && (
                <div className="p-4 text-xs border-t border-gray-200 dark:border-gray-700">
                  <p className="truncate">{footer}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          // Default Layout - Pokemon card style with fixed sections
          <div className="h-full flex flex-col">
            {/* Header section with title and attribute */}
            <div className="p-2 flex justify-between items-center bg-background/90 border-b border-gray-200 dark:border-gray-700">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg truncate">{title}</h3>
                {subtitle && <p className="text-xs opacity-75 truncate">{subtitle}</p>}
              </div>
              
              {attributeValue && attributeLabel && (
                <div className="flex-shrink-0 flex items-center bg-background/80 p-1 rounded ml-2">
                  <span className="font-bold text-lg">{attributeValue}</span>
                  <span className="ml-1 text-xs">{attributeLabel}</span>
                </div>
              )}
            </div>
            
            {/* Image section - fixed height with proper scaling */}
            <div className="p-2 flex items-center justify-center" style={{ height: "150px" }}>
              <img
                src={imageUrl}
                alt={title}
                className="rounded-md"
                style={{ 
                  maxHeight: "140px",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
                onLoad={handleImageLoad}
              />
            </div>
            
            {/* Description section */}
            {description && (
              <div className="px-3 py-2 text-sm border-t border-gray-200 dark:border-gray-700">
                <p className="line-clamp-2">{description}</p>
              </div>
            )}
            
            {/* Traits section - scrollable if needed */}
            <div className="flex-grow overflow-auto">
              {traits.length > 0 && (
                <div className="p-2">
                  <div className="grid grid-cols-2 gap-2">
                    {visibleTraits.map((trait, i) => (
                      <div key={i} className="flex flex-col bg-background/80 p-1.5 rounded">
                        <span className="text-xs font-medium opacity-75 truncate">
                          {trait.name}
                        </span>
                        <span className="text-xs font-semibold truncate">
                          {trait.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  {hasMoreTraits && (
                    <div className="mt-1 text-xs text-center opacity-75">
                      +{traits.length - maxVisibleTraits} more
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Card footer */}
            {footer && (
              <div className="px-3 py-1.5 text-xs border-t border-gray-200 dark:border-gray-700">
                <p className="truncate">{footer}</p>
              </div>
            )}
          </div>
        )}
        
        {children}
      </div>
    );
  }
);

TradingCard.displayName = "TradingCard"; 