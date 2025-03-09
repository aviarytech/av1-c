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
    ...props 
  }, ref) => {
    // Extract credential type (for subtitle)
    const credentialType = credential.type.length > 1 
      ? credential.type[credential.type.length - 1] 
      : 'Verifiable Credential';
    
    // Extract title from credential subject
    const title = credential.credentialSubject[titleProperty] || 'Credential';
    
    // Extract image URL
    const imageUrl = credential.credentialSubject[imageProperty] || 
      'https://placehold.co/400x200/e2e8f0/64748b?text=Credential';
    
    // Format issuer information
    const issuerName = typeof credential.issuer === 'string' 
      ? credential.issuer 
      : credential.issuer.name || credential.issuer.id;
    
    // Format issuance date
    const issuanceDate = new Date(credential.issuanceDate).toLocaleDateString();
    
    // Determine border color based on verification status
    const statusColor = !borderColor && credential.verificationStatus 
      ? credential.verificationStatus === 'verified' 
        ? '#10b981' // Green for verified
        : credential.verificationStatus === 'invalid' 
          ? '#ef4444' // Red for invalid
          : '#f59e0b' // Amber for unverified
      : borderColor;
    
    // Determine background color based on credential type
    const typeColor = !backgroundColor ? 'rgba(236, 253, 245, 0.8)' : backgroundColor;
    
    return (
      <TradingCard
        ref={ref}
        className={cn("vc-card", className)}
        title={title}
        subtitle={credentialType}
        borderColor={statusColor}
        backgroundColor={typeColor}
        footer={`Issued by ${issuerName} on ${issuanceDate}`}
        {...props}
      >
        {/* Verification status badge */}
        {showVerificationStatus && credential.verificationStatus && (
          <div className="absolute top-3 right-3 z-10">
            {credential.verificationStatus === 'verified' && (
              <div className="flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                <CheckCircle className="w-3 h-3 mr-1" />
                <span>Verified</span>
              </div>
            )}
            {credential.verificationStatus === 'invalid' && (
              <div className="flex items-center bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                <AlertCircle className="w-3 h-3 mr-1" />
                <span>Invalid</span>
              </div>
            )}
            {credential.verificationStatus === 'unverified' && (
              <div className="flex items-center bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                <Shield className="w-3 h-3 mr-1" />
                <span>Unverified</span>
              </div>
            )}
          </div>
        )}
        
        {/* Display selected credential subject properties */}
        <div className="space-y-2 mt-2">
          {displayProperties.map((prop) => {
            if (!credential.credentialSubject[prop]) return null;
            
            return (
              <div key={prop} className="flex justify-between text-sm">
                <span className="font-medium text-gray-600">{prop}:</span>
                <span className="text-gray-900">
                  {typeof credential.credentialSubject[prop] === 'object'
                    ? JSON.stringify(credential.credentialSubject[prop])
                    : credential.credentialSubject[prop].toString()}
                </span>
              </div>
            );
          })}
        </div>
        
        {/* Credential ID (truncated) */}
        {credential.id && (
          <div className="mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500 truncate">
            ID: {credential.id}
          </div>
        )}
      </TradingCard>
    );
  }
);

VerifiableCredentialCard.displayName = "VerifiableCredentialCard"; 