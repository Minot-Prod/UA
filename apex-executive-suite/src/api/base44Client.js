import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68ce948c27c15d8f622eb449", 
  requiresAuth: true // Ensure authentication is required for all operations
});
