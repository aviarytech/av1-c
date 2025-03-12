import * as React from "react";
import { TradingCard, TradingCardProps } from "./TradingCard";
import { cn } from "../../utils/cn";
import { Shield, CheckCircle, AlertCircle } from "lucide-react";

export interface VerifiableCredential {
  id?: string;
  type: string[];
  issuer: string | { id: string; name?: string };
  issuanceDate: string;
  credentialSubject: {
    id?: string;
    [key: string]: any;
  };
  // Optional verification status
  verificationStatus?: 'verified' | 'unverified' | 'invalid';
}

export interface VerifiableCredentialCardProps extends Omit<TradingCardProps, 'title' | 'subtitle' | 'description'> {
  /**
   * The verifiable credential data to display
   */
  credential: VerifiableCredential;
  
  /**
   * Which credential subject property to use as the main image
   */
  imageProperty?: string;
  
  /**
   * Which credential subject property to use as the title
   */
  titleProperty?: string;
  
  /**
   * Which credential subject properties to display in the card body
   */
  displayProperties?: string[];
  
  /**
   * Whether to show the verification status
   */
  showVerificationStatus?: boolean;
}

export const VerifiableCredentialCard = React.forwardRef<HTMLDivElement, VerifiableCredentialCardProps>(
  ({ 
    className, 
    credential, 
    imageProperty = 'image',
    titleProperty = 'name',
    displayProperties = [],
    showVerificationStatus = true,
    borderColor,
    backgroundColor,
    imageUrl: providedImageUrl,
    cardSize = 'standard',
    ...props 
  }, ref) => {
    // Extract credential type (for subtitle)
    const credentialType = credential.type.length > 1 
      ? credential.type[credential.type.length - 1] 
      : 'Verifiable Credential';
    
    // Extract title from credential subject
    const title = credential.credentialSubject[titleProperty] || 'Credential';
    
    // Extract image URL - use provided imageUrl if available, otherwise use from credential
    const imageUrl = providedImageUrl || credential.credentialSubject[imageProperty] || 
      'https://placehold.co/400x200/e2e8f0/64748b?text=Credential';
    
    // Format issuer information
    const issuerName = typeof credential.issuer === 'string' 
      ? credential.issuer 
      : credential.issuer.name || credential.issuer.id;
    
    // Format issuance date
    const issuanceDate = new Date(credential.issuanceDate).toLocaleDateString();
    
    // Determine if we're in dark mode
    const isDarkMode = typeof document !== 'undefined' && 
      document.documentElement.classList.contains('dark');
    
    // Determine border color based on verification status and dark mode
    const statusColor = !borderColor && credential.verificationStatus 
      ? credential.verificationStatus === 'verified' 
        ? isDarkMode ? '#059669' : '#10b981' // Green for verified
        : credential.verificationStatus === 'invalid' 
          ? isDarkMode ? '#b91c1c' : '#ef4444' // Red for invalid
          : isDarkMode ? '#b45309' : '#f59e0b' // Amber for unverified
      : borderColor;
    
    // Determine background color based on credential type and dark mode
    const typeColor = !backgroundColor 
      ? isDarkMode ? '#134e4a' : 'rgba(236, 253, 245, 0.8)' 
      : backgroundColor;
    
    // Create traits array from displayProperties
    const traits = displayProperties
      .filter(prop => credential.credentialSubject[prop] !== undefined)
      .map(prop => ({
        name: prop,
        value: typeof credential.credentialSubject[prop] === 'object'
          ? JSON.stringify(credential.credentialSubject[prop])
          : String(credential.credentialSubject[prop])
      }));
    
    return (
      <TradingCard
        ref={ref}
        className={cn("vc-card", className)}
        title={title}
        subtitle={credentialType}
        borderColor={statusColor}
        backgroundColor={typeColor}
        footer={`Issued by ${issuerName} on ${issuanceDate}`}
        imageUrl={imageUrl}
        traits={traits}
        cardSize={cardSize}
        {...props}
      >
        {/* Verification status badge */}
        {showVerificationStatus && credential.verificationStatus && (
          <div className="absolute top-3 right-3 z-20 p-1">
            {credential.verificationStatus === 'verified' && (
              <div className={cn(
                "flex items-center text-xs px-2 py-1 rounded-full",
                isDarkMode 
                  ? "bg-green-900 text-green-100" 
                  : "bg-green-100 text-green-800"
              )}>
                <CheckCircle className="w-3 h-3 mr-1" />
                <span>Verified</span>
              </div>
            )}
            {credential.verificationStatus === 'invalid' && (
              <div className={cn(
                "flex items-center text-xs px-2 py-1 rounded-full",
                isDarkMode 
                  ? "bg-red-900 text-red-100" 
                  : "bg-red-100 text-red-800"
              )}>
                <AlertCircle className="w-3 h-3 mr-1" />
                <span>Invalid</span>
              </div>
            )}
            {credential.verificationStatus === 'unverified' && (
              <div className={cn(
                "flex items-center text-xs px-2 py-1 rounded-full",
                isDarkMode 
                  ? "bg-amber-900 text-amber-100" 
                  : "bg-amber-100 text-amber-800"
              )}>
                <Shield className="w-3 h-3 mr-1" />
                <span>Unverified</span>
              </div>
            )}
          </div>
        )}
        
        {/* Credential ID (truncated) */}
        {credential.id && (
          <div className={cn(
            "px-4 py-2 mt-2 text-xs truncate",
            isDarkMode 
              ? "text-gray-400" 
              : "text-gray-500"
          )}>
            ID: {credential.id}
          </div>
        )}
      </TradingCard>
    );
  }
);

VerifiableCredentialCard.displayName = "VerifiableCredentialCard"; 