import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68ce94f898a1ca8a607ab08e", 
  requiresAuth: true // Ensure authentication is required for all operations
});
