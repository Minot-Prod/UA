import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with authentication required
export const base44 = createClient({
  appId: "68e868c4c571c63e3dac61c9", 
  requiresAuth: true // Ensure authentication is required for all operations
});
