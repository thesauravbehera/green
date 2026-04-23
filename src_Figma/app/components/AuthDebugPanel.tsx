import { useAuth } from "../contexts/AuthContext";
import { auth } from "../lib/firebase";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

export function AuthDebugPanel() {
  const { currentUser, userLoggedIn, loading } = useAuth();

  // Only show in development (you can remove this component later)
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <Card className="fixed bottom-4 right-4 p-4 max-w-sm z-50 bg-card/95 backdrop-blur-sm border-2 border-primary/20">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">🔐 Auth Debug Panel</h3>
          <Badge variant={userLoggedIn ? "default" : "secondary"}>
            {userLoggedIn ? "Logged In" : "Logged Out"}
          </Badge>
        </div>
        
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Loading:</span>
            <span className="font-mono">{loading ? "true" : "false"}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">User Logged In:</span>
            <span className="font-mono">{userLoggedIn ? "true" : "false"}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Current User:</span>
            <span className="font-mono">{currentUser ? "exists" : "null"}</span>
          </div>
          
          {currentUser && (
            <>
              <div className="pt-2 border-t border-border/50">
                <div className="text-muted-foreground mb-1">User Details:</div>
                <div className="pl-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">UID:</span>
                    <span className="font-mono text-xs truncate max-w-[150px]" title={currentUser.uid}>
                      {currentUser.uid.substring(0, 8)}...
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="font-mono text-xs truncate max-w-[150px]" title={currentUser.email || ""}>
                      {currentUser.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Display Name:</span>
                    <span className="font-mono text-xs">
                      {currentUser.displayName || "Not set"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email Verified:</span>
                    <span className="font-mono">{currentUser.emailVerified ? "✅" : "❌"}</span>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="pt-2 border-t border-border/50">
            <div className="text-muted-foreground mb-1">Firebase Auth:</div>
            <div className="pl-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current User:</span>
                <span className="font-mono">{auth.currentUser ? "exists" : "null"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
