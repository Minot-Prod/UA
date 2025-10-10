import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68ce93aa3b1b7907b6e78135", 
  requiresAuth: true // Ensure authentication is required for all operations
});
