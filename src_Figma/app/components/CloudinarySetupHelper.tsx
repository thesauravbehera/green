import { AlertCircle, CheckCircle, ExternalLink, FileText } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CloudinarySetupHelperProps {
  isLoaded: boolean;
  isConfigured: boolean;
  error: Error | null;
}

export function CloudinarySetupHelper({ isLoaded, isConfigured, error }: CloudinarySetupHelperProps) {
  const hasIssues = !isLoaded || !isConfigured || error;
  
  if (!hasIssues) return null;

  // If it's just not configured (first time setup), make it informational not alarming
  const isSetupNeeded = !isConfigured && !error;
  const hasError = error || (isConfigured && !isLoaded);

  return (
    <Card className={`p-6 glass mb-6 ${hasError ? 'border-warning/30 bg-warning/5' : 'border-primary/20 bg-primary/5'}`}>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          {hasError ? (
            <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
          )}
          <div className="flex-1">
            <h3 className="font-semibold mb-2">
              {isSetupNeeded ? '📸 Enable Image Uploads (Optional)' : 'Image Upload Setup Required'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {isSetupNeeded 
                ? 'Image uploads are currently disabled. Set up Cloudinary to let users share plant photos!'
                : 'To enable image uploads in the Community Hub, please complete the Cloudinary setup.'}
            </p>
          </div>
        </div>

        <div className="space-y-2 pl-8">
          {/* Status Checks */}
          <div className="flex items-center gap-2 text-sm">
            {isLoaded ? (
              <CheckCircle className="w-4 h-4 text-success" />
            ) : (
              <AlertCircle className="w-4 h-4 text-warning" />
            )}
            <span>Cloudinary Script: {isLoaded ? 'Loaded ✓' : 'Loading...'}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            {isConfigured ? (
              <CheckCircle className="w-4 h-4 text-success" />
            ) : (
              <AlertCircle className="w-4 h-4 text-warning" />
            )}
            <span>
              Configuration: {isConfigured ? 'Complete ✓' : 'Needs Setup'}
            </span>
          </div>

          {error && (
            <div className="flex items-start gap-2 text-sm">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <span className="text-destructive flex-1">{error.message}</span>
            </div>
          )}
        </div>

        <div className="pl-8 pt-2 space-y-2">
          <p className="text-sm font-medium">Quick Setup:</p>
          <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>Open <code className="px-1.5 py-0.5 bg-muted rounded text-xs">/lib/cloudinary.ts</code></li>
            <li>Replace <code className="px-1.5 py-0.5 bg-muted rounded text-xs">YOUR_CLOUD_NAME</code> with your Cloudinary cloud name</li>
            <li>Create an unsigned upload preset named <code className="px-1.5 py-0.5 bg-muted rounded text-xs">bloomify_community</code></li>
            <li>Refresh this page</li>
          </ol>

          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              asChild
              className="border-primary/30 hover:bg-primary/10"
            >
              <a 
                href="https://cloudinary.com/console" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-3 h-3" />
                Cloudinary Console
              </a>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                // In a real app, this would open the file or documentation
                window.open('/CLOUDINARY_SETUP.md', '_blank');
              }}
              className="border-primary/30 hover:bg-primary/10 flex items-center gap-2"
            >
              <FileText className="w-3 h-3" />
              Setup Guide
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
